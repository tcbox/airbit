"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import useProfile from '@/_hooks/useProfile'

import { Input } from '@/components/ui/input'

const ProfilePage = () => {
  const [userIdInput, setUserIdInput] = useState("1")
  const { profile, isLoading, error } = useProfile({ userId: userIdInput })

  return (
      <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px', maxWidth: '300px' }}>
              <label style={{ marginRight: '10px', fontSize: '14px', fontWeight: '500' }}>User ID:</label>
              <Input 
                  type="text" 
                  value={userIdInput} 
                  onChange={(e) => setUserIdInput(e.target.value)}
                  className="mt-2"
              />
          </div>

          {isLoading && <p>Data is Loading ...</p>}
          {error && <p>Error: {error}</p>}

          {!isLoading && !error && profile && (
              <div>
                  <div><strong>ID:</strong> { profile.id}</div>
                  <div><strong>Email:</strong> { profile.email}</div>
                  <div><strong>First Name:</strong> { profile.firstName}</div>
                  <div><strong>Last Name:</strong> {profile.lastName}</div>
                  {profile.image && (
                      <Image 
                          src={profile.image} 
                          alt={profile.firstName || "Profile Image"} 
                          width={100} 
                          height={100} 
                          style={{ marginTop: '10px' }}
                          priority
                      />
                  )}
              </div>
          )}
    </div>
  )
}

export default ProfilePage