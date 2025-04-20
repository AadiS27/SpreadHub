const BlogPage = () => {
    return ( 
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Blog Page</h1>
            <p className="text-center mt-5">Welcome to the blog page!</p>
            <div className="flex justify-center mt-10">
                <img src="/blog-image.jpg" alt="Blog" className="w-1/2 h-auto rounded-lg shadow-lg" />
            </div>
            <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
                <ul className="list-disc list-inside space-y-3">
                    <li><a href="#" className="text-blue-500 hover:underline">Article 1: Understanding React</a></li>
                    <li><a href="#" className="text-blue-500 hover:underline">Article 2: Getting Started with Next.js</a></li>
                    <li><a href="#" className="text-blue-500 hover:underline">Article 3: Building a Blog with Tailwind CSS</a></li>
                </ul>
            </div>
        </div>
    );
}
 
export default BlogPage;