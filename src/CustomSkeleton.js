import React from 'react'
import Skeleton from 'react-loading-skeleton';

const CustomSkeleton = () => {
    return (
        <>
            <Skeleton height={40} />
            <Skeleton count={3} height={30} />
            <Skeleton count={5} height={10} />
        </>
    )
}

export default CustomSkeleton
