import { Post } from './types';
import Link from 'next/link';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { 
  
  });

  if (!res.ok) {
  
    throw new Error('Gagal mengambil data');
  }

  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Daftar Artikel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-3 text-indigo-600 truncate">{post.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
            <Link 
              href={`/posts/${post.id}`}
              className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-150 font-medium"
            >
              Baca Selengkapnya
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}