const Newsletter = () => {
    return (
        <section className="py-20 bg-yellow-500">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Subscribe to our Newsletter</h2>
                <p className="text-black/80 mb-8 max-w-2xl mx-auto">
                    Get the latest trading tips, market updates, and exclusive offers delivered straight to your inbox.
                </p>
                <form className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="px-4 py-3 rounded border-none focus:ring-2 focus:ring-black outline-none text-black"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="px-4 py-3 rounded border-none focus:ring-2 focus:ring-black outline-none text-black"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors"
                    >
                        Subscribe Now
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
