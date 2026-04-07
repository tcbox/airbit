import { create } from "zustand";

interface Ireactions {
    likes: number;
    dislikes: number;
}

interface IPost {
    id: string;
    title: string;
    body: string;
    tags: string[] | null,
    reactions: Ireactions,
    views: number,
    userid: number,
}

interface PostState {
    posts: IPost[];
    total: number,
    skip: number,
    limit: number,
    isLoading: boolean,
    error: string | null,
    fetchPosts : (userId:string) => Promise<void>
}

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    total: 0,
    skip: 0,
    limit: 0,
    isLoading: false,
    error: null,

    fetchPosts: async (userId: string) => {

        set({ isLoading: true, error: null, })
        
        try {
            const res = await fetch(`https://dummyjson.com/posts`)
            if (!res.ok) {
                throw new Error(`User not found`)
            }
            const PostData = await res.json()
            set({
                posts: PostData.posts,
                total: PostData.total,
                skip: PostData.skip,
                limit: PostData.limit,
                isLoading: false
            })

        } catch (error) {
            if (error instanceof Error) {
                set({error: error.message, isLoading: false})
            } else {
                set({error: 'Something went wrong', isLoading: false})
            }
        }
    }
}))
