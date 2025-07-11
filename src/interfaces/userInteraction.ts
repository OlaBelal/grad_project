// interfaces/userInteraction.ts
export interface UserInteraction {
    id: string; // معرف الحدث أو الرحلة
    type: 'event' | 'travel'; // نوع العنصر
    checkout: number; // عدد مرات النقر
    favourite: boolean; // هل أضيف للمفضلة؟
    like?: boolean; // (اختياري) هل أعجب به؟
    booked: boolean; // هل تم الحجز؟
    total: number; // النتيجة النهائية
  }
  
  export interface UserInteractionForAPI {
    id: string; // معرف المستخدم
    userInteraction: {
      eventID: string; // معرف الحدث أو الرحلة
      type: 'event' | 'travel'; // نوع العنصر
      total: number; // النتيجة النهائية
    }[];
  }
