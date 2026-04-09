"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import useProfile from '@/_hooks/useProfile'
import { IPost } from '@/store/usePostStore'

import { Input } from '@/components/ui/input'

const ProfilePage = () => {
  const [userIdInput, setUserIdInput] = useState("")
  const { profile, isLoading, isError, posts, toggleLike } = useProfile({ userId: userIdInput, limit: 30})

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
          {isError && <p>Error: {isError}</p>}

          {!isLoading && !isError && profile && (
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

          {/* Posts Display Section */}
          {!isLoading && !isError && posts && posts.length > 0 && (
              <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
                      {profile?.firstName}&apos;s Posts
                  </h2>
                  <div className="flex flex-col gap-5">
                      {posts.map((post: IPost) => (
                          <div 
                              key={post.id} 
                              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                          >
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.body}</p>
                              
                              <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-4 border-t border-gray-100">
                                  {/* Interactive Action Buttons */}
                                  <div className="flex items-center gap-2">
                                      <button 
                                          className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium active:scale-95"
                                          title="View Post"
                                      >
                                          <span>👀</span> 
                                          <span>{post.views} Views</span>
                                      </button>
                                      
                                      <button 
                                          onClick={() => toggleLike(post.id)}
                                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium active:scale-95 ${
                                              post.isLiked 
                                                ? 'text-rose-600 bg-rose-50 border border-rose-100 shadow-sm' 
                                                : 'text-gray-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-border'
                                          }`}
                                          title={post.isLiked ? "Unlike Post" : "Like Post"}
                                      >
                                          <span>{post.isLiked ? '❤️' : '🤍'}</span> 
                                          <span>{post.reactions?.likes || 0} Likes</span>
                                      </button>
                                  </div>

                                  {/* Tags */}
                                  {post.tags && (
                                      <div className="flex flex-wrap gap-2">
                                          {post.tags.map((tag: string) => (
                                              <span 
                                                  key={tag} 
                                                  className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium cursor-default"
                                              >
                                                  #{tag}
                                              </span>
                                          ))}
                                      </div>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

    </div>
  )
}

export default ProfilePage