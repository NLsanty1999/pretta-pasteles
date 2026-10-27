
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminDb() {
    if (!getApps().length) {
        const serviceAccount = JSON.parse(
            process.env.FIREBASE_SERVICE_ACCOUNT_JSON
        );

        initializeApp({
            credential: cert(serviceAccount),
        });
    }

    return getFirestore();
}

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]);
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido",
        });
    }

    try {
        if (
            !process.env.TELEGRAM_BOT_TOKEN ||
            !process.env.TELEGRAM_CHAT_ID ||
            !process.env.FIREBASE_SERVICE_ACCOUNT_JSON
        ) {
            throw new Error("Faltan variables de entorno");
        }

        const { orderId } = req.body || {};

        if (
            typeof orderId !== "string" ||
            !/^[a-zA-Z0-9_-]{1,150}$/.test(orderId)
        ) {
            return res.status(400).json({
                error: "Pedido inválido",
            });
        }

        const db = getAdminDb();
        const orderRef = db.collection("orders").doc(orderId);
        const orderSnapshot = await orderRef.get();

        if (!orderSnapshot.exists) {
            return res.status(404).json({
                error: "Pedido no encontrado",
            });
        }

        const order = orderSnapshot.data();

        if (order.telegramNotifiedAt) {
            return res.status(200).json({
                success: true,
                alreadySent: true,
            });
        }

        const items = Array.isArray(order.items)
            ? order.items
            : [];

        const itemLines = items.map((item) => {
            const name =
                item.name ||
                item.title ||
                item.productName ||
                item.product?.name ||
                "Producto";

            const quantity =
                item.quantity ?? item.qty ?? 1;

            return `• ${escapeHtml(name)} x ${escapeHtml(quantity)}`;
        });

        const price = Number(order.price || 0).toLocaleString(
            "es-AR"
        );

        const message = [
            "🎂 <b>¡Nuevo pedido en Pretta Pasteles!</b>",
            "",
            `👤 <b>Cliente:</b> ${escapeHtml(order.client?.name || "Sin nombre")}`,
            `📱 <b>Teléfono:</b> ${escapeHtml(order.client?.phone || "Sin teléfono")}`,
            "",
            "<b>🧁 Productos:</b>",
            ...(itemLines.length ? itemLines : ["• Sin productos detallados"]),
            "",
            `💰 <b>Total:</b> $${price}`,
            `📅 <b>Entrega:</b> ${escapeHtml(order.deliveryDate || "Sin fecha")}`,
            `🕒 <b>Horario:</b> ${escapeHtml(order.deliveryHour || "Sin horario")}`,
            `📌 <b>Estado:</b> ${escapeHtml(order.status || "Pendiente")}`,
        ].join("\n");

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: "HTML",
                }),
            }
        );

        const telegramResult = await telegramResponse.json();

        if (!telegramResponse.ok || !telegramResult.ok) {
            console.error("Error al enviar notificación a Telegram");

            return res.status(502).json({
                error: "No se pudo enviar la notificación",
            });
        }

        await orderRef.update({
            telegramNotifiedAt: new Date(),
        });

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("Error en telegram-notify:", error.message);

        return res.status(500).json({
            error: "Error al procesar la notificación",
        });
    }
}
