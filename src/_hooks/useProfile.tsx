
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'

export default function useProfile({userId}: {userId: string}) {
    
    const {fetchProfile, isLoading, error, profile}= useUserStore()
    useEffect(() => {
        if(userId) {
            fetchProfile(userId)
        }
    }, [fetchProfile, userId])
    
    return { profile, isLoading, error }
}
