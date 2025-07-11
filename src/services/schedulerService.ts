
// services/schedulerService.ts
import { sendInteractionsToAPI } from './apiService';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

let submissionInterval: number | null = null;

export const setupWeeklySubmission = (userId: string): (() => void) => {
  if (submissionInterval !== null) {
    clearInterval(submissionInterval);
  }

  const submitData = async () => {
    try {
      console.log('Submitting user interactions...');
      await sendInteractionsToAPI(userId);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  submitData();
  
  submissionInterval = window.setInterval(submitData, ONE_WEEK);

  return () => {
    if (submissionInterval !== null) {
      clearInterval(submissionInterval);
    }
  };
};