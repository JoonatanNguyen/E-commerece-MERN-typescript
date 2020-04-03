import React, { useEffect, useState } from 'react'

const useHideOnScroll = () => {
  const prevScrollY = React.useRef<number>()
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsHidden(isHidden => {
        const scrolledDown = window.scrollY > prevScrollY.current!
        if (scrolledDown && !isHidden) {
          return true
        } else if (!scrolledDown && isHidden) {
          return false
        } else {
          prevScrollY.current = window.scrollY
          return isHidden
        }
      })
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isHidden
}

export default useHideOnScroll
