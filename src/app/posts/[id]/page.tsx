import { Post } from '../../types';
import { notFound } from 'next/navigation';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
     
      notFound();
    }
   
    throw new Error('Gagal mengambil detail artikel');
  }

  return res.json();
}


export async function generateStaticParams() {
  
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await getPost(params.id);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6 border-b pb-4">
          ID Artikel: <span className="font-semibold">{post.id}</span> | User ID: <span className="font-semibold">{post.userId}</span>
        </p>
        <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.body}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <a href="/" className="inline-block bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-150 font-medium">
          &larr; Kembali ke Daftar Artikel
        </a>
      </div>
    </div>
  );
}