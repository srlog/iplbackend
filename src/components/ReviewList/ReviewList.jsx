import React from 'react'
import './ReviewList.css'
import { FaStar } from 'react-icons/fa'
import Button from '../Button/Button'
import DeleteConfirmationModal from '../ConfirmationModel/ConfirmationModal'
import { useState } from 'react'
import { deleteReview } from '../../service/api.service'
import Review from '../Review/Review'

const ReviewList = ({ reviews, userId, fetchReviews }) => {
  if (!reviews || reviews.length === 0) {
    return null
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const deleteReviewfunc = async (reviewId) => {
    try {
      await deleteReview(reviewId)
      fetchReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  console.log(reviews)
  return (
    <div className="review-list">
      <h4 className="review-list-heading">User Reviews</h4>
      <div
        className={`review-list-scroll ${
          reviews.length > 2 ? 'scrollable' : ''
        }`}
      >
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="review-item">
              <div
                style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
              >
                <div style={{ width: '80%' }}>
                  <div>
                    {/* {index === 0 && ( */}
                    <p className="review-author">
                      User: {review.user.username}
                    </p>
                    {/* )} */}
                  </div>
                  <div className="review-rating">
                    <div>Rating: </div>
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} color="gold" />
                    ))}
                  </div>
                  <p className="review-text">
                    Description: {review.description}"
                  </p>
                  {index < reviews.length - 1 && (
                    <hr className="review-divider" />
                  )}
                </div>
                {userId === review.userId && (
                  <div
                    style={{
                      width: '20%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '30%',
                    }}
                  >
                    <Button
                      label="Delete"
                      className="delete-review-btn"
                      onClick={() => setOpenDeleteModal(true)}
                    />

                    <Button
                      label="Edit"
                      className="edit-review-btn"
                      onClick={() => setReviewModal(true)}
                    />
                    <DeleteConfirmationModal
                      open={openDeleteModal}
                      onClose={() => setOpenDeleteModal(false)}
                      onConfirm={() => deleteReviewfunc(review.id)}
                      title="Delete Review"
                      description="Are you sure you want to delete this review?"
                    />
                    {reviewModal && (
                      <Review
                        movieId={review.movieId}
                        setIsModalOpen={setReviewModal}
                        review={review}
                        fetchReviews={fetchReviews}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default ReviewList
