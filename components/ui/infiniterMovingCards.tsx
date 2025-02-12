'use client'

import { blogsarr } from '@/data/blogs'
import { cn } from '@/utils/cn'
import React, { useEffect, useState } from 'react'
import { ThreeDCardDemo } from '../inHouse/blogCard'
import { FollowerPointerCard } from './following-pointer'

export const InfiniteMovingCards = ({
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        )
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        // max-w-7xl to w-screen
        'scroller relative z-20 w-screen overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          // change gap-16
          ' flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {blogsarr.map((i) => (
          <div>
            <FollowerPointerCard title={i.heading}>
              <ThreeDCardDemo
                key={i.id}
                heading={i.heading}
                desc={i.desc}
                pink={i.pink}
                blogImage={i.blogImage}
              />
            </FollowerPointerCard>
          </div>
        ))}
      </ul>
    </div>
  )
}
