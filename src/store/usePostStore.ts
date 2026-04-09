import { create } from "zustand";

interface Ireactions {
    likes: number;
    dislikes: number;
}

export interface IPost {
    id: number;
    title: string;
    body: string;
    tags: string[] | null,
    reactions: Ireactions,
    views: number,
    userid: number,
    isLiked?: boolean,
}

interface PostState {
    posts: IPost[];
    total: number,
    skip: number,
    limit: number,
    isLoading: boolean,
    error: string | null,
    fetchPosts : (userId?: string, limit?: number, skip?: number) => Promise<void>
    toggleLike: (postId: number) => void;
}

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    total: 0,
    skip: 0,
    limit: 0,
    isLoading: false,
    error: null,

    fetchPosts: async (userId?: string, limit: number = 30, skip: number = 0) => {

        set({ isLoading: true, error: null, })
        
        try {
            // Optional: User id unte vaalla posts thevali, lekapothe all posts
            // Ippatiki all posts with limit fetch chesthunnam:
            const url = userId 
                ? `https://dummyjson.com/posts/user/${userId}?limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`

            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`Failed to fetch posts`)
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
    },

    toggleLike: (postId: number) => {
        set((state) => {
            
            
            return {
                posts: state.posts.map(post => {
                    console.log("state",state)
                    if (post.id === postId) {
                    const currentlyLiked = post.isLiked || false;
                    const change = currentlyLiked ? -1 : 1;
                    return {
                        ...post,
                        isLiked: !currentlyLiked,
                        reactions: {
                            ...post.reactions,
                            likes: (post.reactions?.likes || 0) + change
                        }
                    };
                }
                return post;
                })
            }
        });
    }
}))
