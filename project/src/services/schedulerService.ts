// services/schedulerService.ts
import { sendInteractionsToAPI } from './apiService';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // أسبوع واحد بالميلي ثانية

let submissionInterval: number | null = null; // تغيير النوع من NodeJS.Timeout إلى number

export const setupWeeklySubmission = (userId: string): (() => void) => {
  // تنظيف أي فترات زمنية موجودة مسبقاً
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

  // الإرسال الفوري
  submitData();
  
  // الإرسال الدوري
  submissionInterval = window.setInterval(submitData, ONE_WEEK);

  return () => {
    if (submissionInterval !== null) {
      clearInterval(submissionInterval);
    }
  };
};
