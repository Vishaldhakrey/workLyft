import React, { useEffect } from 'react'
import axios from 'axios'
import ReviewCard from './ReviewCard' // Import the ReviewCard component
import { useDispatch, useSelector } from 'react-redux'
import { setAllReview } from '@/store/slices/reviewSlice'
import { REVIEW_API_END_POINT } from "@/utils/constant"

const ReviewsSection = () => {
    const dispatch = useDispatch()
    const { reviews } = useSelector((store) => store.review)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${REVIEW_API_END_POINT}/get`, { withCredentials: true })

                if (res.data.reviews) {
                    dispatch(setAllReview(res.data.reviews))
                } else {
                    console.error("Failed to fetch reviews")
                }
            } catch (error) {
                console.error("Error fetching reviews:", error)
            }
        }
        fetchReviews()
    }, [dispatch])
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Customer Reviews</h2>
            <div className="grid md:grid-cols-3  grid-cols-1 gap-4 my-5">
                {reviews.slice(0,3).map((review) => (
                    <ReviewCard
                        key={review._id}
                        name={review.user?.fullName || "Anonymous"}
                        date={new Date(review.createdAt).toLocaleDateString()}
                        comment={review.comment}
                        profilePhoto={review.user?.profile?.profilePhoto || "default-avatar.png"}
                        rating={review.rating}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReviewsSection
