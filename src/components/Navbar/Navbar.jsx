function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FFF8F3]/80 backdrop-blur-md border-b border-[#EAD7DE]">
            <div className="max-w-md mx-auto flex flex-col items-center justify-center py-3">

                <h1
                    className="text-[#fcb09f] leading-none"
                    style={{
                        fontFamily: "BeautyGadish",
                        fontSize: "4rem",
                    }}
                >
                    Pretta
                </h1>

                {/*<p
                    
                    className="
                        font-pasteles
                        text-[20px]
                        tracking-[0.45em]
                        text-[#fcb09f]
                        uppercase
                        -mt-2
                    "
                >
                    Pasteles
                </p> */}
                

                <div className="w-20 h-px bg-[#D8B8C3] mt-2" />
            </div>
        </header>
    );
}

export default Navbar;