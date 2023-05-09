import React from 'react'

const useSafeDispatch = dispatch => {
  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return React.useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args)
      }
    },
    [dispatch],
  )
}

export default useSafeDispatch
