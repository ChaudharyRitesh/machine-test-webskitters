import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({reviews}) => {
  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No reviews available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      {reviews.map((review, index) => {
        const filledStars = Math.floor(review.rating);
        const emptyStars = 5 - filledStars;

        return (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewerName}>{review.reviewerName}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(filledStars)].map((_, i) => (
                <FontAwesome
                  key={`star-filled-${i}`}
                  name="star"
                  size={15}
                  color="#f39c12"
                />
              ))}
              {[...Array(emptyStars)].map((_, i) => (
                <FontAwesome
                  key={`star-empty-${i}`}
                  name="star-o"
                  size={15}
                  color="#f39c12"
                />
              ))}
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
            <Text style={styles.date}>{moment(review.date).format('ll')}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  reviewContainer: {
    marginBottom: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
    marginLeft: 8,
  },
  comment: {
    fontSize: 14,
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  reviewerEmail: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Reviews;
