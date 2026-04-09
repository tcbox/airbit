
import { useUserStore } from '@/store/useUserStore'
import { usePostStore  } from "@/store/usePostStore";
import { useEffect } from 'react'

export default function useProfile({userId, limit}: {userId: string, limit?: number}) {
    
    
    const {fetchProfile, isLoading: profileLoading, error:profileError, profile}= useUserStore()
    const { fetchPosts, isLoading: postLoading, error: postError, posts, toggleLike } = usePostStore()
    
    useEffect(() => {
        if(userId) {
            fetchProfile(userId)
            fetchPosts(userId, limit)
        }
    }, [fetchProfile, userId])
    
    return {
        profile,
        isLoading: profileLoading || postLoading,
        isError: profileError || postError,
        posts,
        toggleLike
    }
}
