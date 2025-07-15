import { sendInteractionsToAPI } from './apiService';
import { migrateOldInteractions } from './localStorageService';

const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

let submissionInterval: number | null = null;

export const setupWeeklySubmission = (userId: string): (() => void) => {
  // Validate userId before proceeding
  if (!userId || typeof userId !== 'string') {
    console.error('Invalid userId provided');
    throw new Error('A valid userId must be provided');
  }

  // Migrate old interaction format if needed
  migrateOldInteractions();

  // Clean up any existing interval
  if (submissionInterval !== null) {
    clearInterval(submissionInterval);
    submissionInterval = null;
  }

  const submitData = async () => {
    try {
      const currentDateTime = new Date().toISOString();
      console.log(`[${currentDateTime}] Submitting user interactions for userId:`, userId);
      
      const success = await sendInteractionsToAPI(userId);
      
      if (success) {
        console.log('Interactions submitted successfully');
      } else {
        console.warn('No valid interactions to submit or submission failed');
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  // Immediate execution followed by weekly scheduling
  submitData().catch(error => {
    console.error('Initial submission failed:', error);
  });
  
  submissionInterval = window.setInterval(submitData, ONE_WEEK_IN_MILLISECONDS);

  // Cleanup function to clear the interval when needed
  return () => {
    if (submissionInterval !== null) {
      clearInterval(submissionInterval);
      submissionInterval = null;
    }
  };
};