import { create } from "zustand";

interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
}

interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: (userId:string)=> Promise<void>
}


export const useUserStore = create<UserState>((set) => ({
    
    profile: null,
    isLoading: false,
    error: null,

    fetchProfile: async (userId: string) => {
        
        set({ isLoading: true, error: null })

        try {
            const res = await fetch(`https://dummyjson.com/users/${userId}`)
            if (!res.ok) {
                throw new Error(`user not found`)
            }
            const data = await res.json()
            console.log(data);
            set({ profile: data, isLoading: false })
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({error: error.message, isLoading:false})
            } else {
                set({error: "Something went wrong", isLoading:false})
            }
        }
    }


}))