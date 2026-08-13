function WhatsAppButton() {

    const whatsappNumber = "543758649258";

    const whatsappMessage = encodeURIComponent(
        "Hola! Quería consultar por un pedido 😊"
    );

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


    return (

        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="
                fixed
                bottom-24
                right-5
                z-[90]
                w-14
                h-14
                rounded-full
                bg-[#25D366]
                text-white
                shadow-xl
                flex
                items-center
                justify-center
                text-2xl
                hover:scale-105
                transition
            "
        >

            💬

        </a>

    );

}

export default WhatsAppButton;