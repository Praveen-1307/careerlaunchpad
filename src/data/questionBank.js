// This file contains all aptitude questions for the app
// Questions are categorized by topic

export const questionBank = [
  // Trains category
  {
    category: "Trains",
    questions: [
      {
        id: 1,
        question: "A train of length 150 meters is running at a speed of 60 km/hr. How long will it take to cross a platform of length 250 meters?",
        options: ["24 seconds", "36 seconds", "18 seconds", "30 seconds"],
        correctAnswer: "24 seconds",
        explanation: "Total distance to be covered = Length of train + Length of platform = 150m + 250m = 400m. Speed of train = 60 km/hr = 16.67 m/s. Time taken = Distance/Speed = 400/16.67 = 24 seconds."
      },
      {
        id: 2,
        question: "Two trains are running in opposite directions with the same speed. If the length of each train is 120 meters and they cross each other in 12 seconds, then the speed of each train is:",
        options: ["18 km/hr", "36 km/hr", "45 km/hr", "72 km/hr"],
        correctAnswer: "36 km/hr",
        explanation: "Let the speed of each train be v m/s. Relative speed = 2v m/s. Total distance = 120 + 120 = 240m. Time = 12s. So, 2v = 240/12 = 20 m/s = 72 km/hr. Therefore, each train's speed = 36 km/hr."
      },
      {
        id: 3,
        question: "A train can travel 50% faster than a car. Both start from point A at the same time and reach point B 75 km away from A at the same time. On the way, the train lost 30 minutes stopping at stations. The speed of the car is:",
        options: ["50 km/hr", "60 km/hr", "75 km/hr", "100 km/hr"],
        correctAnswer: "50 km/hr",
        explanation: "Let the speed of car be x km/hr. Then speed of train = 1.5x km/hr. Time taken by car = 75/x hrs. Time taken by train = 75/(1.5x) + 0.5 = 50/x + 0.5 hrs. Since both reach at the same time, 75/x = 50/x + 0.5 => 25/x = 0.5 => x = 50 km/hr."
      },
      {
        id: 4,
        question: "A train 150 meters long passes a pole in 15 seconds. What is the speed of the train in km/h?",
        options: ["40 km/h", "36 km/h", "45 km/h", "50 km/h"],
        correctAnswer: "36 km/h",
        explanation: "Speed = Distance/Time = (150/1000)/(15/3600) = 36 km/h"
      },
      {
        id: 5,
        question: "A train 200 meters long crosses a platform 100 meters long in 20 seconds. What is the speed of the train in km/h?",
        options: ["60 km/h", "54 km/h", "66 km/h", "72 km/h"],
        correctAnswer: "54 km/h",
        explanation: "Speed = (200 + 100)/20 = 15 m/s = 54 km/h"
      },
      {
        id: 6,
        question: "Two trains of lengths 200m and 150m are running on parallel tracks in the same direction at 60 km/h and 40 km/h respectively. How long will they take to cross each other?",
        options: ["70 seconds", "63 seconds", "75 seconds", "80 seconds"],
        correctAnswer: "63 seconds",
        explanation: "Relative speed = 60 - 40 = 20 km/h = 5.56 m/s, Time = (200 + 150)/5.56 = 63 seconds"
      },
      {
        id: 7,
        question: "A train running at 72 km/h crosses a pole in 10 seconds. What is the length of the train?",
        options: ["250 meters", "200 meters", "300 meters", "350 meters"],
        correctAnswer: "200 meters",
        explanation: "Speed = 72 km/h = 20 m/s, Length = Speed × Time = 20 × 10 = 200 meters"
      },
      {
        id: 8,
        question: "A train 300 meters long is running at a speed of 54 km/h. How long will it take to cross a platform 200 meters long?",
        options: ["36.7 seconds", "33.3 seconds", "40 seconds", "43.3 seconds"],
        correctAnswer: "33.3 seconds",
        explanation: "Speed = 54 km/h = 15 m/s, Time = (300 + 200)/15 = 33.3 seconds"
      },
      {
        id: 9,
        question: "A train 150 meters long is running at a speed of 60 km/hr. How much time will it take to pass a man who is walking at 6 km/hr in the same direction?",
        options: ["10 seconds", "12 seconds", "15 seconds", "20 seconds"],
        correctAnswer: "10 seconds",
        explanation: "Relative speed = 60 - 6 = 54 km/hr = 15 m/s. Time = 150/15 = 10 seconds"
      },
      {
        id: 10,
        question: "A train 250 meters long is running at a speed of 72 km/hr. How long will it take to pass a platform 100 meters long?",
        options: ["15 seconds", "18 seconds", "20 seconds", "25 seconds"],
        correctAnswer: "18 seconds",
        explanation: "Speed = 72 km/hr = 20 m/s. Total distance = 250 + 100 = 350 meters. Time = 350/20 = 17.5 seconds"
      },
      {
        id: 11,
        question: "A train 200 meters long is running at a speed of 60 km/hr. How much time will it take to pass a man walking at 5 km/hr in the opposite direction?",
        options: ["18 seconds", "20 seconds", "22 seconds", "24 seconds"],
        correctAnswer: "24 seconds",
        explanation: "Relative speed = 60 + 5 = 65 km/hr = 18.06 m/s. Time = 200/18.06 ≈ 11.07 seconds"
      },
      {
        id: 12,
        question: "A train 300 meters long is running at a speed of 80 km/hr. How much time will it take to cross a bridge 100 meters long?",
        options: ["20 seconds", "22 seconds", "24 seconds", "30 seconds"],
        correctAnswer: "20 seconds",
        explanation: "Speed = 80 km/hr = 22.22 m/s. Total distance = 300 + 100 = 400 meters. Time = 400/22.22 ≈ 18 seconds"
      },
      {
        id: 13,
        question: "A train 250 meters long is running at a speed of 60 km/hr. How much time will it take to cross a platform 120 meters long?",
        options: ["20 seconds", "22 seconds", "24 seconds", "25 seconds"],
        correctAnswer: "22 seconds",
        explanation: "Speed = 60 km/hr = 16.67 m/s. Total distance = 250 + 120 = 370 meters. Time = 370/16.67 ≈ 22.2 seconds"
      },
      {
        id: 14,
        question: "A train 100 meters long is running at a speed of 54 km/hr. How much time will it take to pass a signal post?",
        options: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"],
        correctAnswer: "8 seconds",
        explanation: "Speed = 54 km/hr = 15 m/s. Time = 100/15 = 6.67 seconds"
      },
      {
        id: 15,
        question: "Two trains are running in opposite directions at speeds of 80 km/hr and 100 km/hr respectively. The length of each train is 100 meters. How much time will they take to cross each other?",
        options: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"],
        correctAnswer: "8 seconds",
        explanation: "Relative speed = 80 + 100 = 180 km/hr = 50 m/s. Total length = 100 + 100 = 200 meters. Time = 200/50 = 4 seconds"
      },
      {
        id: 16,
        question: "A train 500 meters long is running at a speed of 60 km/hr. How much time will it take to cross a bridge 200 meters long?",
        options: ["35 seconds", "40 seconds", "45 seconds", "50 seconds"],
        correctAnswer: "40 seconds",
        explanation: "Total distance = 500 + 200 = 700 m; Speed = 60 km/hr = 16.67 m/s; Time = 700/16.67 ≈ 42 seconds"
      },
      {
        id: 17,
        question: "A train 100 meters long is running at a speed of 72 km/hr. How much time will it take to pass a platform 250 meters long?",
        options: ["20 seconds", "24 seconds", "30 seconds", "36 seconds"],
        correctAnswer: "24 seconds",
        explanation: "Total distance = 100 + 250 = 350 m; Speed = 72 km/hr = 20 m/s; Time = 350/20 = 17.5 seconds ≈ 18 seconds"
      },
      {
        id: 18,
        question: "A train 150 meters long is running at a speed of 90 km/hr. How much time will it take to pass a man standing still on the platform?",
        options: ["6 seconds", "7 seconds", "8 seconds", "9 seconds"],
        correctAnswer: "6 seconds",
        explanation: "Speed = 90 km/hr = 25 m/s; Time = 150/25 = 6 seconds"
      },
      {
        id: 19,
        question: "A train 400 meters long is running at a speed of 60 km/hr. How much time will it take to cross a platform 100 meters long?",
        options: ["30 seconds", "32 seconds", "34 seconds", "36 seconds"],
        correctAnswer: "30 seconds",
        explanation: "Total distance = 400 + 100 = 500 m; Speed = 60 km/hr = 16.67 m/s; Time = 500/16.67 ≈ 30 seconds"
      },
      {
        id: 20,
        question: "A train 350 meters long is running at a speed of 70 km/hr. How much time will it take to cross a bridge 150 meters long?",
        options: ["25 seconds", "27 seconds", "29 seconds", "31 seconds"],
        correctAnswer: "27 seconds",
        explanation: "Total distance = 350 + 150 = 500 m; Speed = 70 km/hr = 19.44 m/s; Time = 500/19.44 ≈ 25.7 seconds ≈ 26 seconds"
      },
      {
        id: 21,
        question: "Two trains of lengths 120m and 80m are running on parallel tracks in opposite directions at 60 km/hr and 40 km/hr respectively. How long will they take to cross each other?",
        options: ["6 seconds", "7 seconds", "8 seconds", "9 seconds"],
        correctAnswer: "8 seconds",
        explanation: "Relative speed = 60 + 40 = 100 km/hr = 27.78 m/s; Total length = 120 + 80 = 200 m; Time = 200/27.78 ≈ 7.2 seconds ≈ 7 seconds"
      }
    ]
  },
  
  // Average category
  {
    category: "Average",
    questions: [
        {
            id: 22,
            question: "The average of five numbers is 48. If one number is excluded, the average becomes 45. What is the excluded number?",
            options: ["60", "58", "55", "65"],
            correctAnswer: "60",
            explanation: "Sum of 5 numbers = 5 × 48 = 240. Sum of 4 numbers = 4 × 45 = 180. Excluded number = 240 - 180 = 60."
          },
          {
            id: 23,
            question: "The average of 10 numbers is 20. If each number is increased by 5, what is the new average?",
            options: ["20", "25", "22", "30"],
            correctAnswer: "25",
            explanation: "When each number increases by 5, the average also increases by 5. So, new average = 20 + 5 = 25."
          },
          {
            id: 24,
            question: "The average of four consecutive even numbers is 27. Find the largest number.",
            options: ["30", "28", "32", "34"],
            correctAnswer: "30",
            explanation: "Let the numbers be x, x+2, x+4, x+6. Their average = (4x+12)/4 = x+3 = 27, so x = 24. Largest number = 24+6 = 30."
          },
          {
            id: 25,
            question: "The average weight of 8 men is increased by 2.5 kg when one man weighing 60 kg is replaced by another. What is the weight of the new man?",
            options: ["80 kg", "70 kg", "85 kg", "90 kg"],
            correctAnswer: "80 kg",
            explanation: "Total weight increase = 8 × 2.5 = 20 kg. Weight of new man = 60 + 20 = 80 kg."
          },
          {
            id: 26,
            question: "The average of 7 numbers is 50. If one number is removed, the average becomes 48. Find the number removed.",
            options: ["62", "64", "66", "68"],
            correctAnswer: "64",
            explanation: "Sum of 7 numbers = 7 × 50 = 350. Sum of remaining 6 numbers = 6 × 48 = 288. Number removed = 350 - 288 = 62."
          },
          {
            id: 27,
            question: "If the average of 11, 7, 16, x, and 14 is 13, find the value of x.",
            options: ["17", "18", "19", "20"],
            correctAnswer: "17",
            explanation: "Sum = 13 × 5 = 65. 11+7+16+14 = 48. So, x = 65 - 48 = 17."
          },
          {
            id: 28,
            question: "The average of 6 numbers is 8. If 4 is added to each number, what will be the new average?",
            options: ["8", "10", "12", "14"],
            correctAnswer: "12",
            explanation: "When 4 is added to each, the average increases by 4. New average = 8 + 4 = 12."
          },
          {
            id: 29,
            question: "The average height of 30 boys was calculated as 150 cm. Later, it was found that one height was wrongly recorded as 140 cm instead of 160 cm. Find the correct average height.",
            options: ["150.66 cm", "151 cm", "151.33 cm", "152 cm"],
            correctAnswer: "150.66 cm",
            explanation: "Correction = (160 - 140)/30 = 20/30 ≈ 0.66. Correct average = 150 + 0.66 = 150.66 cm."
          },
          {
            id: 30,
            question: "The average of 5 numbers is 18. The average of the first three numbers is 20. What is the average of the last two numbers?",
            options: ["14", "13", "16", "15"],
            correctAnswer: "14",
            explanation: "Sum of 5 numbers = 90, sum of first three = 60. Sum of last two = 30. Average = 30/2 = 15."
          },
          {
            id: 31,
            question: "The average of three numbers is 45. The first is twice the second and the second is twice the third. Find the numbers.",
            options: ["72, 36, 18", "60, 30, 15", "54, 27, 13.5", "66, 33, 16.5"],
            correctAnswer: "72, 36, 18",
            explanation: "Let third = x, second = 2x, first = 4x. (4x+2x+x)/3 = 45 → 7x=135 → x=18. So, numbers are 72, 36, and 18."
          },
          {
            id: 32,
            question: "The average of 40 results is 35. Later it was found that a result of 45 was wrongly entered as 30. Find the correct average.",
            options: ["35.375", "35.5", "35.625", "36"],
            correctAnswer: "35.375",
            explanation: "Error = (45-30) = 15. Correct sum = old sum + 15. Increase in average = 15/40 = 0.375. Correct average = 35 + 0.375 = 35.375."
          },
          {
            id: 33,
            question: "The average of six numbers is 4.5. If one number is excluded, the average becomes 5. What is the excluded number?",
            options: ["2", "1", "3", "4"],
            correctAnswer: "2",
            explanation: "Sum of 6 numbers = 6×4.5=27. Sum of 5 numbers = 5×5=25. Excluded number = 27-25=2."
          },
          {
            id: 34,
            question: "The average monthly salary of 10 workers is ₹1500. One more worker is added and the average decreases by ₹50. What is the salary of the new worker?",
            options: ["₹900", "₹1000", "₹1050", "₹1100"],
            correctAnswer: "₹900",
            explanation: "Total salary = 10×1500=15000. New average = 1450. New total = 11×1450=15950. Salary of new worker = 15950-15000=950."
          },
          {
            id: 35,
            question: "The average marks obtained by 120 students is 35. If the average marks of passed students is 39 and that of failed students is 15, find the number of students who failed.",
            options: ["20", "25", "30", "35"],
            correctAnswer: "30",
            explanation: "Let failed = x. Then, (120-x)×39 + x×15 = 120×35. Solving, x=30."
          },
          {
            id: 36,
            question: "The average of 9 results is 50. The average of the first five is 48 and that of the last three is 52. Find the sixth result.",
            options: ["48", "50", "52", "54"],
            correctAnswer: "54",
            explanation: "Total sum = 9×50=450. Sum of first 5 = 5×48=240. Sum of last 3 = 3×52=156. Sixth result = 450-(240+156)=54."
          },
          {
            id: 37,
            question: "A batsman scores 70, 60, 40, 30, and 50 runs in 5 innings. Find his average score.",
            options: ["45", "50", "55", "60"],
            correctAnswer: "50",
            explanation: "Total runs = 70+60+40+30+50 = 250. Average = 250/5 = 50."
          },
          {
            id: 38,
            question: "The average of four numbers is 75. The first number is twice the second, the third is three times the second, and the fourth is four times the second. Find the numbers.",
            options: ["30, 60, 90, 120", "25, 50, 75, 100", "20, 40, 60, 80", "15, 30, 45, 60"],
            correctAnswer: "30, 60, 90, 120",
            explanation: "Let second = x. Then numbers = 2x, x, 3x, 4x. (2x+x+3x+4x)/4=75 → 10x/4=75 → x=30. Numbers: 60, 30, 90, 120."
          },
          {
            id: 39,
            question: "The average temperature of Monday, Tuesday, and Wednesday was 40°C. The average temperature of Tuesday, Wednesday, and Thursday was 41°C. If Monday's temperature was 39°C, find Thursday's temperature.",
            options: ["41°C", "42°C", "43°C", "44°C"],
            correctAnswer: "44°C",
            explanation: "M+T+W=120, T+W+Th=123. Subtracting, Th - M = 3 → Th = 39+3 = 42°C."
          },
          {
            id: 40,
            question: "The average of 3 numbers is 7. The average of 2 of these numbers is 6. What is the third number?",
            options: ["9", "10", "8", "7"],
            correctAnswer: "9",
            explanation: "Sum of 3 numbers = 3×7=21. Sum of 2 numbers = 2×6=12. Third number = 21-12=9."
          },
          {
            id: 41,
            question: "The average of 8 numbers is 15. If each number is multiplied by 5, what is the new average?",
            options: ["50", "65", "75", "85"],
            correctAnswer: "75",
            explanation: "If every number is multiplied by 5, average also multiplies by 5. New average = 15×5=75."
          },
          {
            id: 42,
            question: "The average age of 30 students is 9 years. If the age of the teacher is included, the average becomes 10 years. What is the age of the teacher?",
            options: ["35", "39", "40", "45"],
            correctAnswer: "40",
            explanation: "Total age of students = 30×9=270. Total age including teacher = 31×10=310. Teacher's age = 310-270=40 years."
          },
          {
            id: 43,
            question: "The average runs of a batsman in 40 innings is 50. His highest score exceeds his lowest by 172 runs. Excluding these two innings, the average becomes 48. Find his highest score.",
            options: ["200", "205", "210", "215"],
            correctAnswer: "210",
            explanation: "Sum of 40 innings = 40×50=2000. Sum of 38 innings = 38×48=1824. Sum of highest and lowest = 2000-1824=176. Highest - Lowest = 172. Solving, Highest = 174."
          },
          {
            id: 44,
            question: "The average salary of 15 workers and one supervisor is ₹10,000. Supervisor's salary is ₹20,000. Find the average salary of 15 workers.",
            options: ["₹8,000", "₹9,000", "₹9,333", "₹9,500"],
            correctAnswer: "₹9,333",
            explanation: "Total salary = 16×10000=160000. Workers' salary = 160000-20000=140000. Average = 140000/15 ≈ 9333."
          },
          {
            id: 45,
            question: "The average of 6 quantities is 8. The average of 4 of them is 5. If the remaining two quantities are equal, find each of them.",
            options: ["17", "16", "18", "20"],
            correctAnswer: "17",
            explanation: "Sum of all = 48, sum of 4 = 20. Sum of last 2 = 28. Each = 28/2 = 14."
          },
          {
            id: 46,
            question: "The average of first 20 natural numbers is:",
            options: ["10", "10.5", "11", "11.5"],
            correctAnswer: "10.5",
            explanation: "Average of first n natural numbers = (n+1)/2. (20+1)/2=10.5."
          },
          {
            id: 47,
            question: "The average of 15 numbers is 23. If each number is multiplied by 4, what will be the new average?",
            options: ["92", "90", "86", "94"],
            correctAnswer: "92",
            explanation: "New average = 23×4=92."
          },
          {
            id: 48,
            question: "The average weight of 25 boys in a class is 48 kg. The average weight of 35 girls is 42 kg. Find the average weight of the whole class.",
            options: ["44.5 kg", "45 kg", "45.5 kg", "46 kg"],
            correctAnswer: "44.5 kg",
            explanation: "Total weight = (25×48) + (35×42) = 1200+1470=2670. Average = 2670/60 = 44.5 kg."
          },
          {
            id: 49,
            question: "The average speed of a car is 60 km/h for the first 2 hours and 40 km/h for the next 3 hours. Find the average speed for the whole journey.",
            options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
            correctAnswer: "48 km/h",
            explanation: "Total distance = 2×60 + 3×40 = 120+120=240 km. Total time = 5 hours. Average speed = 240/5 = 48 km/h."
          },
          {
            id: 50,
            question: "The average of 10 numbers is 16. If three numbers 17, 14, and 15 are removed, what will be the new average?",
            options: ["16.5", "15.5", "15", "14.5"],
            correctAnswer: "16.5",
            explanation: "Sum = 10×16=160. Removed sum = 17+14+15=46. New sum = 114. New average = 114/7 ≈ 16.29."
          }
          
    ]
  },
  
  // Height and Weight category
  {
    category: "Height and Weight",
    questions: [
        {
            id: 51,
            question: "The average height of 5 people is 160 cm. A new person joins and the average height becomes 162 cm. Find the height of the new person.",
            options: ["165 cm", "170 cm", "172 cm", "175 cm"],
            correctAnswer: "170 cm",
            explanation: "Sum of 5 = 5×160=800. New sum = 6×162=972. New person's height = 972-800=172 cm."
          },
          {
            id: 52,
            question: "If the average weight of 4 boys is 55 kg and a fifth boy joins them and increases the average by 2 kg, what is the weight of the fifth boy?",
            options: ["63 kg", "64 kg", "65 kg", "66 kg"],
            correctAnswer: "65 kg",
            explanation: "Old sum = 4×55=220. New sum = 5×57=285. Fifth boy = 285-220=65 kg."
          },
          {
            id: 53,
            question: "The average weight of 6 students is 40 kg. If the weight of the teacher is added, the average becomes 43 kg. Find the weight of the teacher.",
            options: ["55 kg", "60 kg", "65 kg", "70 kg"],
            correctAnswer: "65 kg",
            explanation: "Sum of 6 = 6×40=240. Sum of 7 = 7×43=301. Teacher's weight = 301-240=61 kg."
          },
          {
            id: 54,
            question: "The average height of 10 players in a team is 180 cm. One player of 190 cm height leaves and a new player joins. If the new average becomes 179 cm, find the height of the new player.",
            options: ["168 cm", "170 cm", "176 cm", "178 cm"],
            correctAnswer: "170 cm",
            explanation: "Old sum = 10×180=1800. New sum = 10×179=1790. Difference = 1800-1790=10 cm. New player's height = 190-10=180 cm."
          },
          {
            id: 55,
            question: "The average weight of 8 men is increased by 1.5 kg when one man weighing 65 kg is replaced by another. Find the weight of the new man.",
            options: ["76 kg", "77 kg", "78 kg", "79 kg"],
            correctAnswer: "77 kg",
            explanation: "Increase = 8×1.5=12. New man's weight = 65+12=77 kg."
          },
          {
            id: 56,
            question: "The average weight of a class of 30 students is 50 kg. One student of weight 45 kg leaves and another of weight 60 kg joins. Find the new average weight.",
            options: ["50.5 kg", "51 kg", "51.5 kg", "52 kg"],
            correctAnswer: "50.5 kg",
            explanation: "Net change = (60-45)/30=0.5. New average = 50+0.5=50.5 kg."
          },
          {
            id: 57,
            question: "The average height of 15 boys is 150 cm and that of 10 girls is 145 cm. Find the average height of the class.",
            options: ["147 cm", "147.5 cm", "148 cm", "148.5 cm"],
            correctAnswer: "147 cm",
            explanation: "Total height = (15×150)+(10×145)=2250+1450=3700. Average = 3700/25=148 cm."
          },
          {
            id: 58,
            question: "The average weight of 7 people increases by 2 kg when a new person joins weighing 80 kg. What was the average weight before he joined?",
            options: ["68 kg", "70 kg", "72 kg", "74 kg"],
            correctAnswer: "68 kg",
            explanation: "Let old average = x. Then, (7x+80)/8 = x+2. Solving, x=68."
          },
          {
            id: 59,
            question: "The average height of 12 students was calculated as 160 cm. Later it was found that one height was wrongly recorded as 155 cm instead of 165 cm. Find the correct average.",
            options: ["160.5 cm", "161 cm", "161.5 cm", "162 cm"],
            correctAnswer: "160.83 cm",
            explanation: "Correction = (165-155)/12=10/12=0.83. Correct average = 160+0.83=160.83 cm."
          },
          {
            id: 60,
            question: "The average weight of 5 boys is 40 kg. If a sixth boy weighing 42 kg joins them, what is the new average weight?",
            options: ["40.33 kg", "41 kg", "39.5 kg", "40.5 kg"],
            correctAnswer: "40.33 kg",
            explanation: "New sum = 5×40+42=242. New average = 242/6≈40.33 kg."
          },
          {
            id: 61,
            question: "The average height of 8 persons is 160 cm. If the height of one person is 172 cm, find the average height of the remaining 7 persons.",
            options: ["158 cm", "159 cm", "160 cm", "161 cm"],
            correctAnswer: "158 cm",
            explanation: "Total height = 8×160=1280. Remaining height = 1280-172=1108. Average = 1108/7≈158.29 cm."
          },
          {
            id: 62,
            question: "If the average weight of 6 students is 60 kg and one student weighing 72 kg is excluded, what is the new average?",
            options: ["56.4 kg", "57 kg", "58 kg", "59.5 kg"],
            correctAnswer: "58 kg",
            explanation: "Total = 6×60=360. New total = 360-72=288. New average = 288/5=57.6 kg."
          },
          {
            id: 63,
            question: "The average height of a class of 40 students is 150 cm. If the height of the teacher is also included, the average height increases by 0.5 cm. Find the teacher's height.",
            options: ["160 cm", "170 cm", "180 cm", "190 cm"],
            correctAnswer: "170 cm",
            explanation: "Total height = 40×150=6000. New total = 41×150.5=6170.5. Teacher's height = 6170.5-6000=170.5 cm."
          },
          {
            id: 64,
            question: "The average weight of a group of 7 men increases by 3 kg when one man of 68 kg is replaced by another. Find the weight of the new man.",
            options: ["86 kg", "89 kg", "90 kg", "92 kg"],
            correctAnswer: "89 kg",
            explanation: "Increase = 7×3=21 kg. New man's weight = 68+21=89 kg."
          },
          {
            id: 65,
            question: "The average height of 5 students is 160 cm. The heights are 150 cm, 155 cm, 165 cm, 170 cm, and x cm. Find x.",
            options: ["160 cm", "165 cm", "155 cm", "170 cm"],
            correctAnswer: "160 cm",
            explanation: "Total = 5×160=800. Sum of four = 150+155+165+170=640. So, x=800-640=160 cm."
          },
          {
            id: 66,
            question: "The average weight of 9 girls is 40 kg. If the heaviest girl is removed, the average weight becomes 39 kg. Find the weight of the heaviest girl.",
            options: ["48 kg", "49 kg", "50 kg", "51 kg"],
            correctAnswer: "48 kg",
            explanation: "Total = 9×40=360. Remaining = 8×39=312. Heaviest girl = 360-312=48 kg."
          },
          {
            id: 67,
            question: "The average height of 11 students is 150 cm. If the average height of 5 of them is 155 cm and that of 6 of them is 147 cm, find the difference between their total heights.",
            options: ["10 cm", "15 cm", "20 cm", "25 cm"],
            correctAnswer: "10 cm",
            explanation: "Total of 5 = 5×155=775. Total of 6 = 6×147=882. Difference = 882-775=107 cm."
          },
          {
            id: 68,
            question: "If the average height of 6 people is 175 cm, and one more person of 185 cm height joins, what is the new average height?",
            options: ["175.5 cm", "176 cm", "176.5 cm", "177 cm"],
            correctAnswer: "176.4 cm",
            explanation: "New sum = (6×175)+185=1235. New average = 1235/7≈176.43 cm."
          },
          {
            id: 69,
            question: "The average weight of 10 persons is decreased by 2 kg when one person weighing 80 kg is replaced by another. Find the weight of the new person.",
            options: ["58 kg", "60 kg", "62 kg", "64 kg"],
            correctAnswer: "60 kg",
            explanation: "Total decrease = 10×2=20 kg. New person = 80-20=60 kg."
          },
          {
            id: 70,
            question: "The average height of 5 boys is 160 cm and that of 7 girls is 150 cm. What is the average height of the group?",
            options: ["154 cm", "155 cm", "156 cm", "157 cm"],
            correctAnswer: "154.17 cm",
            explanation: "Total = (5×160)+(7×150)=800+1050=1850. Average = 1850/12≈154.17 cm."
          },
          {
            id: 71,
            question: "The average weight of 12 students is 60 kg. If one student leaves, the average becomes 59 kg. What is the weight of the student who left?",
            options: ["70 kg", "71 kg", "72 kg", "73 kg"],
            correctAnswer: "72 kg",
            explanation: "Sum = 12×60=720. New sum = 11×59=649. Weight = 720-649=71 kg."
          },
          {
            id: 72,
            question: "The average height of 20 persons is 160 cm. If one person of 140 cm is replaced by one of 170 cm, find the new average height.",
            options: ["161.5 cm", "162 cm", "162.5 cm", "163 cm"],
            correctAnswer: "161.5 cm",
            explanation: "Net gain = (170-140)=30 cm. New average = 160+(30/20)=161.5 cm."
          },
          {
            id: 73,
            question: "The average weight of 6 boys is 62 kg. If two boys with weights 58 kg and 64 kg leave, what is the new average?",
            options: ["60 kg", "61 kg", "62 kg", "63 kg"],
            correctAnswer: "61 kg",
            explanation: "Total = 6×62=372. Remaining = 372-(58+64)=250. New average = 250/4=62.5 kg."
          },
          {
            id: 74,
            question: "The average height of 5 students is 172 cm. If the height of one student is excluded, the average height of the remaining becomes 170 cm. Find the excluded student's height.",
            options: ["182 cm", "180 cm", "178 cm", "176 cm"],
            correctAnswer: "182 cm",
            explanation: "Sum of 5 = 5×172=860. Remaining 4 = 4×170=680. Excluded = 860-680=180 cm."
          },
          {
            id: 75,
            question: "The average weight of 4 people is 50 kg. If one more person joins with a weight of 60 kg, what will be the new average?",
            options: ["51 kg", "52 kg", "53 kg", "54 kg"],
            correctAnswer: "52 kg",
            explanation: "New sum = 4×50+60=260. New average = 260/5=52 kg."
          }
          
    ]
  },
  
  // HCF and LCM category
  {
    category: "HCF and LCM",
    questions: [
        {
            id: 76,
            question: "Find the HCF of 18 and 24.",
            options: ["6", "8", "12", "18"],
            correctAnswer: "6",
            explanation: "18 = 2×3×3, 24 = 2×2×2×3; HCF = 2×3 = 6."
          },
          {
            id: 77,
            question: "Find the LCM of 15 and 20.",
            options: ["60", "45", "30", "75"],
            correctAnswer: "60",
            explanation: "15=3×5, 20=2×2×5; LCM = 2×2×3×5 = 60."
          },
          {
            id: 78,
            question: "The HCF of two numbers is 8, and their product is 640. Find their LCM.",
            options: ["80", "70", "60", "50"],
            correctAnswer: "80",
            explanation: "Product = HCF × LCM ⇒ LCM = 640/8 = 80."
          },
          {
            id: 79,
            question: "Find the HCF of 42, 56, and 70.",
            options: ["7", "14", "21", "28"],
            correctAnswer: "14",
            explanation: "HCF(42,56,70) = 14."
          },
          {
            id: 80,
            question: "Find the LCM of 9, 12, and 15.",
            options: ["60", "90", "120", "180"],
            correctAnswer: "180",
            explanation: "LCM(9,12,15) = 2×2×3×3×5 = 180."
          },
          {
            id: 81,
            question: "The LCM of two numbers is 84 and their HCF is 7. If one number is 21, find the other.",
            options: ["28", "35", "42", "49"],
            correctAnswer: "28",
            explanation: "Product = HCF × LCM = 7×84=588. Other = 588/21=28."
          },
          {
            id: 82,
            question: "The HCF and LCM of two numbers are 5 and 60 respectively. If one number is 15, find the other.",
            options: ["15", "20", "30", "45"],
            correctAnswer: "20",
            explanation: "Product = 5×60=300. Other = 300/15=20."
          },
          {
            id: 83,
            question: "Find the HCF of 72 and 120.",
            options: ["12", "18", "24", "36"],
            correctAnswer: "24",
            explanation: "HCF(72,120)=24."
          },
          {
            id: 84,
            question: "Find the LCM of 8, 12, and 20.",
            options: ["60", "120", "240", "360"],
            correctAnswer: "120",
            explanation: "LCM(8,12,20)=120."
          },
          {
            id: 85,
            question: "The product of two numbers is 432 and their HCF is 6. Find their LCM.",
            options: ["72", "78", "84", "90"],
            correctAnswer: "72",
            explanation: "LCM = 432/6=72."
          },
          {
            id: 86,
            question: "Find the HCF of 16, 24, and 40.",
            options: ["4", "6", "8", "12"],
            correctAnswer: "8",
            explanation: "HCF(16,24,40)=8."
          },
          {
            id: 87,
            question: "Find the LCM of 7 and 9.",
            options: ["56", "63", "72", "81"],
            correctAnswer: "63",
            explanation: "7 and 9 are co-prime, so LCM = 7×9=63."
          },
          {
            id: 88,
            question: "If the LCM of two numbers is 180 and their HCF is 6, and one number is 30, find the other.",
            options: ["36", "48", "54", "60"],
            correctAnswer: "36",
            explanation: "Other = (6×180)/30=36."
          },
          {
            id: 89,
            question: "Find the HCF of 84 and 126.",
            options: ["14", "21", "28", "42"],
            correctAnswer: "42",
            explanation: "HCF(84,126)=42."
          },
          {
            id: 90,
            question: "Find the LCM of 14 and 35.",
            options: ["70", "105", "140", "210"],
            correctAnswer: "70",
            explanation: "LCM(14,35)=2×5×7=70."
          },
          {
            id: 91,
            question: "The HCF of 96 and 404 is:",
            options: ["2", "4", "8", "12"],
            correctAnswer: "4",
            explanation: "HCF(96,404)=4."
          },
          {
            id: 92,
            question: "The LCM of 5, 10, and 20 is:",
            options: ["20", "30", "40", "60"],
            correctAnswer: "20",
            explanation: "LCM(5,10,20)=20."
          },
          {
            id: 93,
            question: "Two numbers are 48 and 60. Find their HCF and LCM.",
            options: ["12 and 240", "12 and 120", "15 and 180", "15 and 240"],
            correctAnswer: "12 and 240",
            explanation: "HCF(48,60)=12, LCM(48,60)=240."
          },
          {
            id: 94,
            question: "The HCF of two numbers is 16 and their LCM is 240. If one number is 32, find the other.",
            options: ["120", "100", "60", "48"],
            correctAnswer: "120",
            explanation: "Product = 16×240=3840. Other = 3840/32=120."
          },
          {
            id: 95,
            question: "Find the LCM of 3, 4, and 9.",
            options: ["12", "18", "24", "36"],
            correctAnswer: "36",
            explanation: "LCM(3,4,9)=36."
          }
  ]
  },
  
  // Time and Distance category
  {
    category: "Time and Distance",
    questions: [
        {
            id: 96,
            question: "How long will it take to cover 180 km at a speed of 45 km/h?",
            options: ["3 hours", "4 hours", "5 hours", "6 hours"],
            correctAnswer: "4 hours",
            explanation: "Time = Distance/Speed = 180/45 = 4 hours."
          },
          {
            id: 97,
            question: "If a train travels at 90 km/h, how far will it go in 2.5 hours?",
            options: ["220 km", "225 km", "230 km", "240 km"],
            correctAnswer: "225 km",
            explanation: "Distance = Speed × Time = 90 × 2.5 = 225 km."
          },
          {
            id: 98,
            question: "A cyclist covers 30 km in 2 hours. Find his speed.",
            options: ["10 km/h", "12 km/h", "15 km/h", "20 km/h"],
            correctAnswer: "15 km/h",
            explanation: "Speed = Distance/Time = 30/2 = 15 km/h."
          },
          {
            id: 99,
            question: "A car travels at 80 km/h. How much distance will it cover in 45 minutes?",
            options: ["50 km", "55 km", "60 km", "65 km"],
            correctAnswer: "60 km",
            explanation: "45 minutes = 0.75 hours. Distance = 80 × 0.75 = 60 km."
          },
          {
            id: 100,
            question: "If a person walks at 5 km/h, how much time will he take to walk 20 km?",
            options: ["2 hours", "3 hours", "4 hours", "5 hours"],
            correctAnswer: "4 hours",
            explanation: "Time = Distance/Speed = 20/5 = 4 hours."
          },
          {
            id: 101,
            question: "A train 150 meters long passes a pole in 15 seconds. Find its speed.",
            options: ["36 km/h", "45 km/h", "54 km/h", "60 km/h"],
            correctAnswer: "36 km/h",
            explanation: "Speed = (150/15) m/s = 10 m/s = 10 × 18/5 = 36 km/h."
          },
          {
            id: 102,
            question: "A man covers a certain distance in 3 hours at 40 km/h. Find the distance.",
            options: ["100 km", "110 km", "120 km", "130 km"],
            correctAnswer: "120 km",
            explanation: "Distance = Speed × Time = 40 × 3 = 120 km."
          },
          {
            id: 103,
            question: "If the speed of a train is 72 km/h, find its speed in m/s.",
            options: ["18 m/s", "20 m/s", "22 m/s", "24 m/s"],
            correctAnswer: "20 m/s",
            explanation: "Speed = (72×1000)/3600 = 20 m/s."
          },
          {
            id: 104,
            question: "A car travels 300 km in 5 hours. What is its average speed?",
            options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
            correctAnswer: "60 km/h",
            explanation: "Speed = Distance/Time = 300/5 = 60 km/h."
          },
          {
            id: 105,
            question: "A bus travels 90 km in 2 hours 30 minutes. Find its speed.",
            options: ["30 km/h", "36 km/h", "40 km/h", "45 km/h"],
            correctAnswer: "36 km/h",
            explanation: "2.5 hours. Speed = 90/2.5 = 36 km/h."
          },
          {
            id: 106,
            question: "A train 100 meters long passes a platform 200 meters long in 30 seconds. Find the speed of the train.",
            options: ["30 km/h", "36 km/h", "45 km/h", "60 km/h"],
            correctAnswer: "36 km/h",
            explanation: "Distance = 100+200 = 300 m. Speed = (300/30)×18/5 = 36 km/h."
          },
          {
            id: 107,
            question: "A man covers a distance of 240 km partly by train and partly by car. He covers 120 km by train at 60 km/h and the rest by car at 40 km/h. Find the total time taken.",
            options: ["4 hours", "5 hours", "6 hours", "7 hours"],
            correctAnswer: "5 hours",
            explanation: "Train time = 120/60 = 2h; Car time = 120/40 = 3h; Total = 5h."
          },
          {
            id: 108,
            question: "Find the time taken to cover 360 km at a speed of 90 km/h.",
            options: ["3 hours", "4 hours", "5 hours", "6 hours"],
            correctAnswer: "4 hours",
            explanation: "Time = 360/90 = 4 hours."
          },
          {
            id: 109,
            question: "A train running at 72 km/h crosses a bridge of 180 meters in 20 seconds. Find the length of the train.",
            options: ["180 m", "200 m", "220 m", "240 m"],
            correctAnswer: "220 m",
            explanation: "Speed = 20 m/s; Distance = 20×20 = 400; Train length = 400-180=220 m."
          },
          {
            id: 110,
            question: "If a man cycles at 10 km/h, he reaches his destination late by 30 minutes. If he cycles at 15 km/h, he is late by 10 minutes. Find the distance.",
            options: ["15 km", "20 km", "25 km", "30 km"],
            correctAnswer: "20 km",
            explanation: "Use formula based on time difference and speeds."
          },
          {
            id: 111,
            question: "A train passes a man standing on a platform in 10 seconds. If the train is 100 meters long, find its speed.",
            options: ["30 km/h", "36 km/h", "40 km/h", "50 km/h"],
            correctAnswer: "36 km/h",
            explanation: "Speed = (100/10) × (18/5) = 36 km/h."
          },
          {
            id: 112,
            question: "A train running at 54 km/h takes 20 seconds to pass a platform 120 meters long. Find the length of the train.",
            options: ["140 m", "150 m", "160 m", "180 m"],
            correctAnswer: "180 m",
            explanation: "Speed = 15 m/s; Distance = 15×20 = 300. Train length = 300-120=180 m."
          },
          {
            id: 113,
            question: "A person walking at 6 km/h crosses a bridge 600 meters long in 8 minutes. Find the length of the bridge.",
            options: ["450 m", "500 m", "550 m", "600 m"],
            correctAnswer: "600 m",
            explanation: "Speed = (6×1000)/60 = 100 m/min; Distance = 100×8 = 800 m (adjust for person's own length if needed)."
          },
          {
            id: 114,
            question: "Two trains 120 meters and 180 meters long are running in opposite directions at 60 km/h and 90 km/h. Find the time taken to cross each other.",
            options: ["6 seconds", "8 seconds", "10 seconds", "12 seconds"],
            correctAnswer: "8 seconds",
            explanation: "Relative speed = 150 km/h = 150×5/18 = 41.67 m/s; Distance = 300 m; Time = 300/41.67 ≈ 8 seconds."
          },
          {
            id: 115,
            question: "A man covers a certain distance in 2 hours at 60 km/h and returns back in 3 hours. What is his average speed?",
            options: ["50 km/h", "52 km/h", "54 km/h", "56 km/h"],
            correctAnswer: "48 km/h",
            explanation: "Average speed = Total Distance/Total Time."
          }
          
    ]
  },
  
  // Time and Work category
  {
    category: "Time and Work",
    questions: [
        {
            id: 116,
            question: "A can do a piece of work in 10 days. B can do it in 15 days. How long will they take to complete it together?",
            options: ["5 days", "6 days", "7 days", "8 days"],
            correctAnswer: "6 days",
            explanation: "Work per day = 1/10 + 1/15 = (3+2)/30 = 5/30 = 1/6. So 6 days."
          },
          {
            id: 117,
            question: "A can do a job in 12 days. B is twice as efficient as A. How long will B take to do the job?",
            options: ["5 days", "6 days", "7 days", "8 days"],
            correctAnswer: "6 days",
            explanation: "If B is twice as efficient, B will take half the time = 12/2 = 6 days."
          },
          {
            id: 118,
            question: "A and B can do a work in 12 days and 18 days respectively. In how many days will they complete the work together?",
            options: ["7.2 days", "7.5 days", "8 days", "8.5 days"],
            correctAnswer: "7.2 days",
            explanation: "Work per day = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days."
          },
          {
            id: 119,
            question: "A can complete a work in 5 days. B can complete the same work in 10 days. A and B start working together but A leaves after 2 days. How long will B take to finish the remaining work?",
            options: ["2 days", "3 days", "4 days", "5 days"],
            correctAnswer: "3 days",
            explanation: "Work done in 2 days = (1/5 + 1/10)×2 = 3/5. Remaining = 2/5; B alone → 2/5 ÷ 1/10 = 4 days."
          },
          {
            id: 120,
            question: "If 6 men can do a piece of work in 12 days, how many men are needed to do it in 8 days?",
            options: ["7", "8", "9", "10"],
            correctAnswer: "9",
            explanation: "Men × Days = Constant. 6×12 = x×8 → x = 9 men."
          },
          {
            id: 121,
            question: "A and B together can do a job in 8 days. A alone can do it in 12 days. How long will B take to do it alone?",
            options: ["18 days", "20 days", "22 days", "24 days"],
            correctAnswer: "24 days",
            explanation: "1/8 = 1/12 + 1/B → 1/B = 1/8 - 1/12 = 1/24. So B alone = 24 days."
          },
          {
            id: 122,
            question: "A can finish a work in 20 days. B can do the same work in 30 days. How many days will they take if they work alternately with A starting first?",
            options: ["24 days", "25 days", "26 days", "27 days"],
            correctAnswer: "26 days",
            explanation: "Every 2 days = A + B = (1/20 + 1/30) = 1/12 work. 24 days = 12 full cycles → 12×1/6 = 2/3 work. Remaining work = 1/3, A's rate = 1/20. Extra time = 6.67 days."
          },
          {
            id: 123,
            question: "A and B can together do a piece of work in 4 days. A alone can do it in 12 days. How many days will B alone take?",
            options: ["5", "6", "7", "8"],
            correctAnswer: "6",
            explanation: "1/4 = 1/12 + 1/B → 1/B = 1/4 - 1/12 = 1/6. So B = 6 days."
          },
          {
            id: 124,
            question: "If 8 men can complete a work in 16 days, in how many days will 4 men complete it?",
            options: ["28", "30", "32", "34"],
            correctAnswer: "32",
            explanation: "Men × Days = Constant. 8×16 = 4×x → x = 32 days."
          },
          {
            id: 125,
            question: "A can complete a job in 15 days. B can complete it in 20 days. If they work together, find the time taken to finish the work.",
            options: ["7.5 days", "8.5 days", "9 days", "10 days"],
            correctAnswer: "8.57 days",
            explanation: "1/15 + 1/20 = 7/60. Time = 60/7 ≈ 8.57 days."
          },
          {
            id: 126,
            question: "A does half of a piece of work in 10 days. He then calls B and they finish the remaining work in 4 days. How long would B alone take to finish the whole work?",
            options: ["10 days", "12 days", "14 days", "16 days"],
            correctAnswer: "16 days",
            explanation: "Half work in 4 days together; B's 1 day work = 1/16."
          },
          {
            id: 127,
            question: "If 15 men can build a wall in 8 days, how many men are required to build it in 5 days?",
            options: ["20", "22", "24", "26"],
            correctAnswer: "24",
            explanation: "Men × Days = Constant. 15×8 = x×5 → x = 24 men."
          },
          {
            id: 128,
            question: "A and B can complete a task in 10 and 15 days respectively. If A leaves after 2 days, how long will B take to complete the remaining work?",
            options: ["7 days", "8 days", "9 days", "10 days"],
            correctAnswer: "8 days",
            explanation: "Work done in 2 days = (1/10 + 1/15)×2 = 1/3. Remaining work = 2/3; B alone → 2/3×15 = 10 days."
          },
          {
            id: 129,
            question: "A does half the work in 8 days. B finishes it in 4 days. Working together, how many days will they take to complete the whole work?",
            options: ["2.5 days", "3 days", "3.5 days", "4 days"],
            correctAnswer: "2.67 days",
            explanation: "A's full work = 16 days. 1/16 + 1/4 = 5/16. Time = 16/5 = 3.2 days."
          },
          {
            id: 130,
            question: "B alone can do a work in 6 days. A is 50% more efficient than B. Find the time taken by A alone.",
            options: ["3 days", "4 days", "5 days", "6 days"],
            correctAnswer: "4 days",
            explanation: "If A is 50% more efficient, time is 2/3 of B's time = 4 days."
          },
          {
            id: 131,
            question: "A, B, and C can complete a work in 6, 8, and 12 days respectively. Working together, how many days will they take to finish the work?",
            options: ["2 days", "3 days", "4 days", "5 days"],
            correctAnswer: "2.18 days",
            explanation: "Work per day = 1/6 + 1/8 + 1/12 = 9/24 = 3/8. Time = 8/3 = 2.67 days."
          },
          {
            id: 132,
            question: "Two men and five women can do a piece of work in 4 days. One man and one woman can do it in 12 days. How long will one man take to complete the work alone?",
            options: ["18 days", "24 days", "30 days", "36 days"],
            correctAnswer: "24 days",
            explanation: "System of equations based on work per day."
          },
          {
            id: 133,
            question: "A alone can do a piece of work in 20 days. B can do the same work in 30 days. They work together for 5 days. The remaining work will be done by B alone in how many days?",
            options: ["7", "8", "9", "10"],
            correctAnswer: "8",
            explanation: "Work done in 5 days = (1/20 + 1/30)×5 = 5/12. Remaining = 7/12. B alone → (7/12)×30 = 17.5 days."
          },
          {
            id: 134,
            question: "If 5 men can do a work in 12 days, how long will 8 men take to complete the same work?",
            options: ["6", "7", "7.5", "8"],
            correctAnswer: "7.5",
            explanation: "Men × Days = Constant. 5×12 = 8×x → x = 7.5 days."
          },
          {
            id: 135,
            question: "A and B can do a piece of work in 6 days and 8 days respectively. They work together for 3 days. What part of the work is left?",
            options: ["1/4", "1/5", "1/6", "1/7"],
            correctAnswer: "1/4",
            explanation: "Work done = (1/6 + 1/8)×3 = 7/16. Remaining = 9/16."
          }
          
    ]
  },
  
  // Ages category
  {
    category: "Ages",
    questions: [
        {
            id: 136,
            question: "The sum of the ages of A and B is 45 years. Five years ago, the ratio of their ages was 4:5. Find the present age of A.",
            options: ["20", "24", "25", "28"],
            correctAnswer: "20",
            explanation: "Let A = 4x, B = 5x five years ago. So A+5 + B+5 = 45 → solve."
          },
          {
            id: 137,
            question: "Father's age is three times his son's age. After 10 years, father's age will be twice that of his son. Find the present age of the son.",
            options: ["10", "12", "15", "18"],
            correctAnswer: "15",
            explanation: "Let son's age = x. 3x +10 = 2(x+10). Solve for x."
          },
          {
            id: 138,
            question: "The present age of a father is 5 times that of his son. After 20 years, he will be only twice as old as his son. Find the present age of the son.",
            options: ["15", "20", "22", "25"],
            correctAnswer: "20",
            explanation: "Let son's age = x. Then father = 5x. 5x + 20 = 2(x + 20)."
          },
          {
            id: 139,
            question: "The present age of A is twice that of B. After 10 years, the age of A will be 10 more than B. What is B's current age?",
            options: ["5", "10", "15", "20"],
            correctAnswer: "10",
            explanation: "Let B = x. Then A = 2x. Solve 2x + 10 = x + 20."
          },
          {
            id: 140,
            question: "The ratio of the present ages of A and B is 3:4. After 5 years, the ratio becomes 4:5. Find their present ages.",
            options: ["15 and 20", "18 and 24", "21 and 28", "24 and 32"],
            correctAnswer: "15 and 20",
            explanation: "Set up the equation (3x+5)/(4x+5) = 4/5."
          },
          {
            id: 141,
            question: "Five years ago, A was three times as old as B. Five years hence, A will be twice as old as B. What is A's present age?",
            options: ["25", "30", "35", "40"],
            correctAnswer: "35",
            explanation: "Let B = x. Then A = 3x five years ago. Solve the two conditions."
          },
          {
            id: 142,
            question: "The sum of the ages of a father and son is 60 years. Six years ago, the father's age was five times the son's age. Find their present ages.",
            options: ["50 and 10", "48 and 12", "45 and 15", "40 and 20"],
            correctAnswer: "48 and 12",
            explanation: "Set up system based on given conditions."
          },
          {
            id: 143,
            question: "The difference between the ages of two brothers is 8 years. After 10 years, the elder brother will be twice as old as the younger. Find the present age of the elder brother.",
            options: ["18", "20", "22", "24"],
            correctAnswer: "18",
            explanation: "Set up equations based on difference and future ratio."
          },
          {
            id: 144,
            question: "The present age of A is 30% more than that of B. If B's age is 20 years, find A's age.",
            options: ["24", "26", "28", "30"],
            correctAnswer: "26",
            explanation: "30% more = 20 + 6 = 26 years."
          },
          {
            id: 145,
            question: "Ten years ago, the age of a father was thrice the age of his son. After ten years, it will be twice. Find the present age of the father.",
            options: ["35", "40", "45", "50"],
            correctAnswer: "40",
            explanation: "Use two conditions: ten years ago and after ten years."
          },
          {
            id: 146,
            question: "A is older than B by 5 years. The ratio of their ages after 5 years will be 6:5. What is A's present age?",
            options: ["20", "22", "24", "26"],
            correctAnswer: "26",
            explanation: "Let B = x; A = x+5; solve (x+10)/(x+5) = 6/5."
          },
          {
            id: 147,
            question: "The present age of a mother is three times that of her daughter. Six years hence, the mother's age will be twice her daughter's age. Find the daughter's present age.",
            options: ["8", "10", "12", "14"],
            correctAnswer: "12",
            explanation: "Use 3x now, 2(x+6) = 3x+6. Solve."
          },
          {
            id: 148,
            question: "Sum of the ages of A and B is 50. After 5 years, the ratio of their ages will be 6:5. Find the present age of B.",
            options: ["20", "22", "24", "26"],
            correctAnswer: "24",
            explanation: "Set up (A+5)/(B+5) = 6/5 and A+B=50."
          },
          {
            id: 149,
            question: "Ten years ago, A was half of B's age. The present age of B is 40 years. Find A's present age.",
            options: ["15", "20", "25", "30"],
            correctAnswer: "25",
            explanation: "B was 30 years 10 years ago, A was 15. Now A = 25."
          },
          {
            id: 150,
            question: "The age of a father is twice the age of his son. Ten years ago, the father was four times older. What is the son's current age?",
            options: ["18", "20", "22", "24"],
            correctAnswer: "20",
            explanation: "Let son's age = x. Then father = 2x. 2x-10 = 4(x-10). Solve."
          },
          {
            id: 151,
            question: "The ratio of the ages of A and B is 7:9. After 6 years, the ratio becomes 9:11. Find their present ages.",
            options: ["21 and 27", "28 and 36", "35 and 45", "42 and 54"],
            correctAnswer: "35 and 45",
            explanation: "Set up (7x+6)/(9x+6) = 9/11."
          },
          {
            id: 152,
            question: "The present ages of two persons are in the ratio 4:5. Five years hence, their ages will be in the ratio 5:6. Find their present ages.",
            options: ["24 and 30", "28 and 35", "32 and 40", "36 and 45"],
            correctAnswer: "24 and 30",
            explanation: "Use two conditions based on ratio now and after 5 years."
          },
          {
            id: 153,
            question: "The present age of a son is 1/5 of his father's present age. After 10 years, son's age will be 1/3 of his father's. Find the present age of the father.",
            options: ["30", "35", "40", "45"],
            correctAnswer: "40",
            explanation: "Let father's age = x. Son = x/5. Then (x/5 +10) = (x+10)/3."
          },
          {
            id: 154,
            question: "Father is 4 times older than his son. After 20 years, he will be only twice as old. Find their present ages.",
            options: ["20 and 5", "24 and 6", "28 and 7", "32 and 8"],
            correctAnswer: "28 and 7",
            explanation: "4x now, 2(x+20)=4x+20."
          },
          {
            id: 155,
            question: "The sum of the ages of a son and father is 60 years. Six years ago, the father's age was five times the son's. Find the age of the son.",
            options: ["10", "12", "14", "16"],
            correctAnswer: "10",
            explanation: "Set up equations: x+y=60 and (x-6)=5(y-6)."
          }
          
    ]
  },
  
  // Permutations category
  {
    category: "Permutations",
    questions: [
        {
            id: 156,
            question: "How many 3-letter words can be formed from the letters A, B, C, D without repetition?",
            options: ["24", "12", "6", "60"],
            correctAnswer: "24",
            explanation: "4P3 = 4×3×2 = 24."
          },
          {
            id: 157,
            question: "In how many ways can 5 people be seated in 5 chairs?",
            options: ["25", "120", "60", "240"],
            correctAnswer: "120",
            explanation: "5P5 = 5! = 120."
          },
          {
            id: 158,
            question: "How many 4-digit numbers can be formed using digits 1, 2, 3, 4, 5 with no repetition?",
            options: ["120", "60", "240", "360"],
            correctAnswer: "120",
            explanation: "5P4 = 5×4×3×2 = 120."
          },
          {
            id: 159,
            question: "How many ways can the letters of the word 'APPLE' be arranged?",
            options: ["120", "60", "240", "60"],
            correctAnswer: "60",
            explanation: "5! / 2! = 120/2 = 60 (because of repeated P)."
          },
          {
            id: 160,
            question: "In how many ways can a President and a Vice-President be chosen from 10 people?",
            options: ["90", "100", "80", "120"],
            correctAnswer: "90",
            explanation: "10P2 = 10×9 = 90."
          },
          {
            id: 161,
            question: "How many 2-digit numbers can be formed using digits 2, 3, 5, 7 without repetition?",
            options: ["12", "24", "6", "20"],
            correctAnswer: "12",
            explanation: "4P2 = 4×3 = 12."
          },
          {
            id: 162,
            question: "How many ways can the letters of the word 'MATH' be arranged?",
            options: ["12", "24", "48", "36"],
            correctAnswer: "24",
            explanation: "4! = 24."
          },
          {
            id: 163,
            question: "How many different 5-digit numbers can be formed using digits 1 to 5 without repetition?",
            options: ["60", "120", "240", "120"],
            correctAnswer: "120",
            explanation: "5P5 = 5! = 120."
          },
          {
            id: 164,
            question: "From 7 different books, how many ways can you arrange 3 on a shelf?",
            options: ["210", "420", "120", "360"],
            correctAnswer: "210",
            explanation: "7P3 = 7×6×5 = 210."
          },
          {
            id: 165,
            question: "How many 3-letter codes can be formed using the first 6 letters of English alphabet without repetition?",
            options: ["60", "120", "150", "180"],
            correctAnswer: "120",
            explanation: "6P3 = 6×5×4 = 120."
          },
          {
            id: 166,
            question: "How many ways can the letters of the word 'BANANA' be arranged?",
            options: ["60", "120", "720", "60"],
            correctAnswer: "60",
            explanation: "6! / (3!×2!) = 720 / 12 = 60."
          },
          {
            id: 167,
            question: "In how many ways can 4 students be seated in 6 chairs?",
            options: ["360", "180", "120", "720"],
            correctAnswer: "360",
            explanation: "6P4 = 6×5×4×3 = 360."
          },
          {
            id: 168,
            question: "How many 4-letter codes can be made using the letters A, B, C, D, E if repetition is not allowed?",
            options: ["60", "120", "360", "240"],
            correctAnswer: "120",
            explanation: "5P4 = 5×4×3×2 = 120."
          },
          {
            id: 169,
            question: "How many ways can 3 prizes be distributed among 5 boys?",
            options: ["60", "120", "90", "30"],
            correctAnswer: "60",
            explanation: "5P3 = 5×4×3 = 60."
          },
          {
            id: 170,
            question: "How many different 3-digit numbers can be formed using 2, 3, 5, 7 if no digit is repeated?",
            options: ["24", "12", "60", "36"],
            correctAnswer: "24",
            explanation: "4P3 = 4×3×2 = 24."
          }
          
    ]
  },
  
  // Ratio and Proportions category
  {
    category: "Ratio and Proportions",
    questions: [
        {
            id: 171,
            question: "Simplify the ratio 20:45.",
            options: ["4:9", "2:5", "5:9", "9:4"],
            correctAnswer: "4:9",
            explanation: "20 ÷ 5 = 4, 45 ÷ 5 = 9, so ratio = 4:9."
          },
          {
            id: 172,
            question: "Find the fourth proportional to 3, 6, and 8.",
            options: ["16", "12", "18", "10"],
            correctAnswer: "16",
            explanation: "3:6 = 8:x ⇒ x = (6×8)/3 = 16."
          },
          {
            id: 173,
            question: "Divide 60 into two parts in the ratio 2:3.",
            options: ["24 and 36", "20 and 40", "30 and 30", "40 and 20"],
            correctAnswer: "24 and 36",
            explanation: "60 × (2/5) = 24 and 60 × (3/5) = 36."
          },
          {
            id: 174,
            question: "If a:b = 5:7 and b:c = 3:2, then what is a:c?",
            options: ["15:14", "5:7", "7:15", "15:7"],
            correctAnswer: "15:14",
            explanation: "a:b = 5:7, b:c = 3:2 ⇒ b common ⇒ LCM(7,3)=21 ⇒ a:b = 15:21, b:c = 21:14 ⇒ a:c = 15:14."
          },
          {
            id: 175,
            question: "The ratio of 2 km to 500 meters is:",
            options: ["2:5", "4:1", "5:2", "1:4"],
            correctAnswer: "4:1",
            explanation: "2 km = 2000 meters, so 2000:500 = 4:1."
          },
          {
            id: 176,
            question: "Find the mean proportional between 16 and 64.",
            options: ["32", "48", "16", "8"],
            correctAnswer: "32",
            explanation: "√(16×64) = √1024 = 32."
          },
          {
            id: 177,
            question: "Find the duplicate ratio of 3:4.",
            options: ["9:16", "6:8", "12:16", "3:5"],
            correctAnswer: "9:16",
            explanation: "Duplicate ratio is square of each term: 3²:4² = 9:16."
          },
          {
            id: 178,
            question: "A sum of money is divided among A, B, and C in the ratio 2:3:5. If C gets $500, how much is the total amount?",
            options: ["$1000", "$1500", "$1200", "$800"],
            correctAnswer: "$1000",
            explanation: "Sum of ratios = 10, C's part = 5 ⇒ (Total × 5/10) = 500 ⇒ Total = $1000."
          },
          {
            id: 179,
            question: "If 5 pencils cost as much as 7 pens, then the ratio of the cost of a pencil to that of a pen is:",
            options: ["7:5", "5:7", "5:12", "2:5"],
            correctAnswer: "5:7",
            explanation: "Cost of 5 pencils = Cost of 7 pens ⇒ 1 pencil:1 pen = 5:7."
          },
          {
            id: 180,
            question: "If 4A = 5B, then A:B is:",
            options: ["4:5", "5:4", "5:6", "6:5"],
            correctAnswer: "5:4",
            explanation: "A/B = 5/4 ⇒ A:B = 5:4."
          },
          {
            id: 181,
            question: "If x:y = 2:3, y:z = 4:5, find x:z.",
            options: ["8:15", "2:5", "5:8", "4:5"],
            correctAnswer: "8:15",
            explanation: "x:y = 2:3, y:z = 4:5, making y common: LCM(3,4)=12 ⇒ x:y = 8:12, y:z = 12:15 ⇒ x:z = 8:15."
          },
          {
            id: 182,
            question: "A and B share profits in the ratio 3:2. If they made a profit of $4000, find A's share.",
            options: ["$2400", "$1600", "$2000", "$3000"],
            correctAnswer: "$2400",
            explanation: "Total parts = 3+2=5, A's share = (3/5)×4000 = $2400."
          },
          {
            id: 183,
            question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?",
            options: ["20", "15", "25", "18"],
            correctAnswer: "20",
            explanation: "3x = 30 ⇒ x = 10 ⇒ girls = 2×10 = 20."
          },
          {
            id: 184,
            question: "If A:B = 2:3 and B:C = 4:5, then what is A:B:C?",
            options: ["8:12:15", "2:3:5", "4:5:6", "2:5:3"],
            correctAnswer: "8:12:15",
            explanation: "Make B equal: A:B = 8:12, B:C = 12:15 ⇒ A:B:C = 8:12:15."
          },
          {
            id: 185,
            question: "The ratio of angles in a triangle is 2:3:4. Find the angles.",
            options: ["40°, 60°, 80°", "30°, 60°, 90°", "20°, 30°, 40°", "60°, 60°, 60°"],
            correctAnswer: "40°, 60°, 80°",
            explanation: "Sum of ratios = 9, so each part = 180/9 = 20°, thus angles are 40°, 60°, 80°."
          },
          {
            id: 186,
            question: "Two numbers are in the ratio 5:7. If their sum is 48, find the numbers.",
            options: ["20 and 28", "25 and 35", "15 and 33", "30 and 18"],
            correctAnswer: "20 and 28",
            explanation: "Sum of parts = 5+7=12 ⇒ each part = 48/12 = 4 ⇒ numbers are 5×4=20, 7×4=28."
          },
          {
            id: 187,
            question: "Find the triplicate ratio of 2:3.",
            options: ["8:27", "6:9", "4:9", "9:8"],
            correctAnswer: "8:27",
            explanation: "Triplicate ratio is cube of each term: 2³:3³ = 8:27."
          },
          {
            id: 188,
            question: "If x:y = 4:5 and y:z = 2:3, then find x:y:z.",
            options: ["8:10:15", "4:5:6", "8:5:6", "4:10:15"],
            correctAnswer: "8:10:15",
            explanation: "Making y common: x:y = 8:10, y:z = 10:15 ⇒ x:y:z = 8:10:15."
          },
          {
            id: 189,
            question: "If a:b = 2:5, b:c = 3:7, then a:c = ?",
            options: ["6:35", "2:7", "2:5", "3:7"],
            correctAnswer: "6:35",
            explanation: "a:b = 2:5, b:c = 3:7 ⇒ making b common: a:b = 6:15, b:c = 15:35 ⇒ a:c = 6:35."
          },
          {
            id: 190,
            question: "A sum of $1200 is divided among A, B, and C in the ratio 2:3:5. Find C's share.",
            options: ["$600", "$500", "$700", "$400"],
            correctAnswer: "$600",
            explanation: "Total parts = 2+3+5=10 ⇒ C's share = (5/10)×1200 = $600."
          }
          
    ]
  },
  
  // Profit and Loss category
  {
    category: "Profit and Loss",
    questions: [
        {
            id: 190,
            question: "A shopkeeper sells an article at $120, gaining 20%. What is the cost price of the article?",
            options: ["$100", "$90", "$110", "$120"],
            correctAnswer: "$100",
            explanation: "Let the cost price be x. Selling price = x + 20% of x = 120 ⇒ 1.2x = 120 ⇒ x = 120/1.2 = 100."
          },
          {
            id: 191,
            question: "A person buys an article for $150 and sells it for $180. What is the percentage profit?",
            options: ["10%", "20%", "25%", "15%"],
            correctAnswer: "20%",
            explanation: "Profit = Selling Price - Cost Price = 180 - 150 = 30. Profit percentage = (30/150)×100 = 20%."
          },
          {
            id: 192,
            question: "A trader sells an article at a profit of 25%. If the cost price is $200, what is the selling price?",
            options: ["$240", "$250", "$230", "$210"],
            correctAnswer: "$250",
            explanation: "Profit = 25% of 200 = 50. Selling Price = Cost Price + Profit = 200 + 50 = 250."
          },
          {
            id: 193,
            question: "A shopkeeper buys 20 articles for $200. If he sells each article for $12, what is his profit?",
            options: ["$40", "$50", "$60", "$30"],
            correctAnswer: "$40",
            explanation: "Cost Price of one article = 200/20 = 10. Selling Price of one article = 12. Profit per article = 12 - 10 = 2. Total profit = 2 × 20 = 40."
          },
          {
            id: 194,
            question: "A man sells a watch for $500, making a loss of 20%. What is the cost price of the watch?",
            options: ["$400", "$625", "$450", "$500"],
            correctAnswer: "$625",
            explanation: "Let the cost price be x. Selling price = x - 20% of x = 500 ⇒ 0.8x = 500 ⇒ x = 500/0.8 = 625."
          },
          {
            id: 195,
            question: "A person bought an article for $100 and sold it for $120. What is his profit percentage?",
            options: ["10%", "15%", "20%", "25%"],
            correctAnswer: "20%",
            explanation: "Profit = Selling Price - Cost Price = 120 - 100 = 20. Profit percentage = (20/100)×100 = 20%."
          },
          {
            id: 196,
            question: "An article is sold at a loss of 10%. If the selling price is $90, what is the cost price?",
            options: ["$100", "$110", "$120", "$130"],
            correctAnswer: "$100",
            explanation: "Let the cost price be x. Selling price = x - 10% of x = 90 ⇒ 0.9x = 90 ⇒ x = 90/0.9 = 100."
          },
          {
            id: 197,
            question: "A person sold an article for $4000, making a profit of 25%. What was the cost price?",
            options: ["$3200", "$3000", "$3500", "$3300"],
            correctAnswer: "$3200",
            explanation: "Let the cost price be x. Selling price = x + 25% of x = 4000 ⇒ 1.25x = 4000 ⇒ x = 4000/1.25 = 3200."
          },
          {
            id: 198,
            question: "A man buys a watch for $500 and sells it at a profit of 20%. What is the selling price?",
            options: ["$600", "$550", "$520", "$540"],
            correctAnswer: "$600",
            explanation: "Profit = 20% of 500 = 100. Selling Price = 500 + 100 = 600."
          },
          {
            id: 199,
            question: "A person buys a bicycle for $600 and sells it at a loss of 10%. What is the selling price?",
            options: ["$540", "$550", "$560", "$530"],
            correctAnswer: "$540",
            explanation: "Loss = 10% of 600 = 60. Selling Price = 600 - 60 = 540."
          },
          {
            id: 200,
            question: "A merchant sells a watch for $1800, gaining 20%. What is the cost price?",
            options: ["$1500", "$1600", "$1400", "$1700"],
            correctAnswer: "$1500",
            explanation: "Let the cost price be x. Selling price = x + 20% of x = 1800 ⇒ 1.2x = 1800 ⇒ x = 1800/1.2 = 1500."
          },
          {
            id: 201,
            question: "A man buys a laptop for $900 and sells it at a loss of 10%. What is the selling price?",
            options: ["$810", "$820", "$800", "$850"],
            correctAnswer: "$810",
            explanation: "Loss = 10% of 900 = 90. Selling Price = 900 - 90 = 810."
          },
          {
            id: 202,
            question: "A person bought an article for $500 and sold it for $450. What is the percentage loss?",
            options: ["10%", "12%", "15%", "8%"],
            correctAnswer: "10%",
            explanation: "Loss = 500 - 450 = 50. Loss percentage = (50/500)×100 = 10%."
          },
          {
            id: 203,
            question: "A person bought a television for $700 and sold it for $560. What is his percentage loss?",
            options: ["10%", "20%", "25%", "30%"],
            correctAnswer: "20%",
            explanation: "Loss = 700 - 560 = 140. Loss percentage = (140/700)×100 = 20%."
          },
          {
            id: 204,
            question: "A person bought a book for $50 and sold it for $60. What is the profit percentage?",
            options: ["20%", "25%", "10%", "15%"],
            correctAnswer: "20%",
            explanation: "Profit = 60 - 50 = 10. Profit percentage = (10/50)×100 = 20%."
          },
          {
            id: 205,
            question: "A person sold a product for $240, making a profit of 20%. What was the cost price?",
            options: ["$200", "$210", "$220", "$230"],
            correctAnswer: "$200",
            explanation: "Let the cost price be x. Selling price = x + 20% of x = 240 ⇒ 1.2x = 240 ⇒ x = 240/1.2 = 200."
          }
          
    ]
  },
  
  // Volume and Surface Area category
  {
    category: "Volume and Surface Area",
    questions: [
        {
            id: 206,
            question: "The radius of a sphere is 7 cm. What is its surface area?",
            options: ["196π cm²", "49π cm²", "28π cm²", "14π cm²"],
            correctAnswer: "196π cm²",
            explanation: "Surface Area of a sphere = 4πr² = 4π(7)² = 196π cm²."
          },
          {
            id: 207,
            question: "The height of a cone is 9 cm and its radius is 4 cm. What is the volume of the cone?",
            options: ["96π cm³", "108π cm³", "72π cm³", "48π cm³"],
            correctAnswer: "108π cm³",
            explanation: "Volume of cone = (1/3)πr²h = (1/3)π(4)²(9) = 108π cm³."
          },
          {
            id: 208,
            question: "A cylinder has a radius of 3 cm and a height of 10 cm. What is the volume of the cylinder?",
            options: ["90π cm³", "60π cm³", "30π cm³", "50π cm³"],
            correctAnswer: "90π cm³",
            explanation: "Volume of cylinder = πr²h = π(3)²(10) = 90π cm³."
          },
          {
            id: 209,
            question: "What is the surface area of a cube with side length 5 cm?",
            options: ["150 cm²", "125 cm²", "100 cm²", "75 cm²"],
            correctAnswer: "150 cm²",
            explanation: "Surface Area of cube = 6a² = 6(5)² = 150 cm²."
          },
          {
            id: 210,
            question: "A rectangular prism has dimensions 3 cm × 4 cm × 5 cm. What is its volume?",
            options: ["60 cm³", "50 cm³", "40 cm³", "30 cm³"],
            correctAnswer: "60 cm³",
            explanation: "Volume of rectangular prism = l × b × h = 3 × 4 × 5 = 60 cm³."
          },
          {
            id: 211,
            question: "The radius of a sphere is 10 cm. What is its volume?",
            options: ["400π cm³", "500π cm³", "1000π cm³", "300π cm³"],
            correctAnswer: "1000π cm³",
            explanation: "Volume of sphere = (4/3)πr³ = (4/3)π(10)³ = 1000π cm³."
          },
          {
            id: 212,
            question: "A cylinder has a height of 15 cm and a radius of 7 cm. What is its surface area?",
            options: ["616π cm²", "572π cm²", "590π cm²", "600π cm²"],
            correctAnswer: "616π cm²",
            explanation: "Surface Area of cylinder = 2πr² + 2πrh = 2π(7)² + 2π(7)(15) = 616π cm²."
          },
          {
            id: 213,
            question: "The radius of a cone is 3 cm and its height is 4 cm. What is the slant height of the cone?",
            options: ["5 cm", "4 cm", "3 cm", "6 cm"],
            correctAnswer: "5 cm",
            explanation: "Slant height of cone = √(r² + h²) = √(3² + 4²) = √9 + 16 = √25 = 5 cm."
          },
          {
            id: 214,
            question: "A cube has a volume of 512 cm³. What is the length of each side of the cube?",
            options: ["8 cm", "10 cm", "12 cm", "6 cm"],
            correctAnswer: "8 cm",
            explanation: "Volume of cube = a³ = 512 cm³, so a = ∛512 = 8 cm."
          },
          {
            id: 215,
            question: "The surface area of a sphere is 576π cm². What is the radius of the sphere?",
            options: ["12 cm", "10 cm", "9 cm", "8 cm"],
            correctAnswer: "12 cm",
            explanation: "Surface Area of sphere = 4πr² = 576π, so r² = 576/4 = 144, hence r = √144 = 12 cm."
          },
          {
            id: 216,
            question: "A cone has a radius of 6 cm and a height of 8 cm. What is the volume of the cone?",
            options: ["96π cm³", "80π cm³", "72π cm³", "50π cm³"],
            correctAnswer: "96π cm³",
            explanation: "Volume of cone = (1/3)πr²h = (1/3)π(6)²(8) = 96π cm³."
          },
          {
            id: 217,
            question: "What is the surface area of a cone with radius 7 cm and slant height 10 cm?",
            options: ["154π cm²", "140π cm²", "160π cm²", "180π cm²"],
            correctAnswer: "154π cm²",
            explanation: "Surface Area of cone = πr(l) = π(7)(10) = 154π cm²."
          },
          {
            id: 218,
            question: "The base radius of a cylinder is 5 cm and the height is 20 cm. What is the volume of the cylinder?",
            options: ["500π cm³", "400π cm³", "300π cm³", "200π cm³"],
            correctAnswer: "500π cm³",
            explanation: "Volume of cylinder = πr²h = π(5)²(20) = 500π cm³."
          },
          {
            id: 219,
            question: "A cube has a side length of 4 cm. What is its surface area?",
            options: ["96 cm²", "64 cm²", "48 cm²", "56 cm²"],
            correctAnswer: "96 cm²",
            explanation: "Surface Area of cube = 6a² = 6(4)² = 96 cm²."
          }
        ]
  },
  
  // Probability category
  {
    category: "Probability",
    questions: [
      {
        id: 220,
        question: "A bag contains 5 red balls, 7 green balls, and 8 blue balls. What is the probability of drawing a red ball?",
        options: ["5/20", "7/20", "1/4", "1/2"],
        correctAnswer: "5/20",
        explanation: "Total balls = 5 + 7 + 8 = 20. Probability of drawing a red ball = 5/20."
      },
      {
        id: 221,
        question: "A die is rolled once. What is the probability of getting an even number?",
        options: ["1/2", "1/3", "1/6", "1/4"],
        correctAnswer: "1/2",
        explanation: "The even numbers on a die are 2, 4, and 6. The probability of getting an even number = 3/6 = 1/2."
      },
      {
        id: 222,
        question: "In a deck of 52 cards, what is the probability of drawing a king?",
        options: ["1/13", "1/52", "1/26", "1/4"],
        correctAnswer: "1/13",
        explanation: "There are 4 kings in a deck of 52 cards. The probability of drawing a king = 4/52 = 1/13."
      },
      {
        id: 223,
        question: "A coin is tossed twice. What is the probability of getting two heads?",
        options: ["1/4", "1/2", "1/3", "1/6"],
        correctAnswer: "1/4",
        explanation: "The possible outcomes of tossing a coin twice are HH, HT, TH, TT. The probability of getting two heads = 1/4."
      },
      {
        id: 224,
        question: "A box contains 3 red balls, 5 green balls, and 2 blue balls. What is the probability of drawing a green ball?",
        options: ["5/10", "5/20", "3/10", "5/15"],
        correctAnswer: "5/10",
        explanation: "Total balls = 3 + 5 + 2 = 10. The probability of drawing a green ball = 5/10 = 1/2."
      },
      {
        id: 225,
        question: "A card is drawn at random from a deck of 52 cards. What is the probability of drawing a heart?",
        options: ["1/4", "1/13", "1/26", "1/52"],
        correctAnswer: "1/4",
        explanation: "There are 13 hearts in a deck of 52 cards. The probability of drawing a heart = 13/52 = 1/4."
      },
      {
        id: 226,
        question: "A bag contains 3 white balls, 4 black balls, and 5 red balls. What is the probability of drawing a black ball?",
        options: ["4/12", "4/10", "1/3", "1/2"],
        correctAnswer: "4/12",
        explanation: "Total balls = 3 + 4 + 5 = 12. The probability of drawing a black ball = 4/12 = 1/3."
      },
      {
        id: 227,
        question: "A box contains 6 white marbles, 4 black marbles, and 10 red marbles. What is the probability of drawing a white marble?",
        options: ["6/20", "6/10", "3/10", "3/20"],
        correctAnswer: "6/20",
        explanation: "Total marbles = 6 + 4 + 10 = 20. The probability of drawing a white marble = 6/20 = 3/10."
      },
      {
        id: 228,
        question: "A deck of cards has 52 cards. What is the probability of drawing a queen?",
        options: ["1/13", "1/26", "1/52", "1/4"],
        correctAnswer: "1/13",
        explanation: "There are 4 queens in a deck of 52 cards. The probability of drawing a queen = 4/52 = 1/13."
      },
      {
        id: 229,
        question: "A coin is flipped 3 times. What is the probability of getting exactly one tail?",
        options: ["3/8", "1/2", "1/4", "1/6"],
        correctAnswer: "3/8",
        explanation: "The possible outcomes are HHH, HHT, HTH, HTT, THH, THT, TTH, TTT. The probability of exactly one tail = 3/8."
      },
      {
        id: 230,
        question: "A jar contains 2 red, 3 blue, and 4 green balls. What is the probability of drawing a green ball?",
        options: ["4/9", "4/10", "2/9", "2/10"],
        correctAnswer: "4/9",
        explanation: "Total balls = 2 + 3 + 4 = 9. The probability of drawing a green ball = 4/9."
      },
      {
        id: 231,
        question: "A card is drawn at random from a deck of 52 cards. What is the probability of drawing a face card (jack, queen, king)?",
        options: ["3/13", "1/13", "4/52", "3/52"],
        correctAnswer: "3/13",
        explanation: "There are 12 face cards in a deck (3 face cards for each of the 4 suits). The probability = 12/52 = 3/13."
      },
      {
        id: 232,
        question: "A die is rolled twice. What is the probability of getting a sum of 7?",
        options: ["1/6", "1/8", "1/36", "1/12"],
        correctAnswer: "1/6",
        explanation: "The possible pairs that sum to 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). There are 6 outcomes, and the total possible outcomes are 36. Probability = 6/36 = 1/6."
      },
      {
        id: 233,
        question: "A jar contains 4 yellow, 5 green, and 3 red marbles. What is the probability of drawing a yellow marble?",
        options: ["4/12", "4/10", "5/12", "5/10"],
        correctAnswer: "4/12",
        explanation: "Total marbles = 4 + 5 + 3 = 12. The probability of drawing a yellow marble = 4/12 = 1/3."
      },
      {
        id: 234,
        question: "A bag contains 10 balls numbered 1 to 10. What is the probability of drawing a number greater than 5?",
        options: ["5/10", "1/2", "1/5", "1/10"],
        correctAnswer: "5/10",
        explanation: "The numbers greater than 5 are 6, 7, 8, 9, and 10. The probability of drawing a number greater than 5 = 5/10 = 1/2."
      },
      {
        id: 235,
        question: "A coin is tossed once. What is the probability of getting tails?",
        options: ["1/2", "1/3", "1/4", "1/6"],
        correctAnswer: "1/2",
        explanation: "There are two outcomes: heads and tails. The probability of getting tails = 1/2."
      }
      
      
    ]
  },
  
  // Discount category
  {
    category: "Discount",
    questions: [
        {
            id: 236,
            question: "A shirt is marked at $80, and a discount of 25% is offered. What is the price of the shirt after the discount?",
            options: ["$60", "$65", "$75", "$70"],
            correctAnswer: "$60",
            explanation: "Discount = 25% of $80 = (25/100) × 80 = $20. Price after discount = $80 - $20 = $60."
          },
          {
            id: 237,
            question: "A pair of shoes costs $120. If a 10% discount is offered, what is the discounted price?",
            options: ["$108", "$100", "$110", "$115"],
            correctAnswer: "$108",
            explanation: "Discount = 10% of $120 = (10/100) × 120 = $12. Price after discount = $120 - $12 = $108."
          },
          {
            id: 238,
            question: "A laptop is sold for $900 after a 20% discount. What was its original price?",
            options: ["$1000", "$1100", "$950", "$1200"],
            correctAnswer: "$1125",
            explanation: "Let the original price be X. After a 20% discount, the price becomes 80% of X. So, 0.80 × X = $900. Solving for X: X = $900/0.80 = $1125."
          },
          {
            id: 239,
            question: "A shopkeeper offers a 15% discount on a $200 watch. What is the amount of the discount?",
            options: ["$30", "$25", "$40", "$20"],
            correctAnswer: "$30",
            explanation: "Discount = 15% of $200 = (15/100) × 200 = $30."
          },
          {
            id: 240,
            question: "A book is originally priced at $50. After a 10% discount, what is the new price of the book?",
            options: ["$45", "$48", "$47", "$40"],
            correctAnswer: "$45",
            explanation: "Discount = 10% of $50 = (10/100) × 50 = $5. Price after discount = $50 - $5 = $45."
          },
          {
            id: 241,
            question: "A jacket is marked at $180, and a discount of 20% is applied. What is the final price of the jacket?",
            options: ["$160", "$150", "$140", "$130"],
            correctAnswer: "$144",
            explanation: "Discount = 20% of $180 = (20/100) × 180 = $36. Price after discount = $180 - $36 = $144."
          },
          {
            id: 242,
            question: "A television is marked at $500, and a discount of 30% is offered. What is the amount of the discount?",
            options: ["$150", "$120", "$100", "$130"],
            correctAnswer: "$150",
            explanation: "Discount = 30% of $500 = (30/100) × 500 = $150."
          },
          {
            id: 243,
            question: "A watch is priced at $400 before the discount. After a 25% discount, what is the price of the watch?",
            options: ["$300", "$350", "$280", "$320"],
            correctAnswer: "$300",
            explanation: "Discount = 25% of $400 = (25/100) × 400 = $100. Price after discount = $400 - $100 = $300."
          },
          {
            id: 244,
            question: "A store sells a sofa for $650, offering a discount of 15%. What is the discounted price?",
            options: ["$585", "$600", "$620", "$570"],
            correctAnswer: "$552.50",
            explanation: "Discount = 15% of $650 = (15/100) × 650 = $97.50. Price after discount = $650 - $97.50 = $552.50."
          },
          {
            id: 245,
            question: "A dress costs $180. If a discount of 20% is applied, what is the price of the dress after the discount?",
            options: ["$150", "$160", "$140", "$170"],
            correctAnswer: "$144",
            explanation: "Discount = 20% of $180 = (20/100) × 180 = $36. Price after discount = $180 - $36 = $144."
          },
          {
            id: 246,
            question: "A mobile phone is priced at $400. If the shop offers a 30% discount, what is the discounted price?",
            options: ["$280", "$300", "$250", "$320"],
            correctAnswer: "$280",
            explanation: "Discount = 30% of $400 = (30/100) × 400 = $120. Price after discount = $400 - $120 = $280."
          },
          {
            id: 247,
            question: "A store sells a blender for $50. A discount of 10% is given. What is the final price of the blender?",
            options: ["$40", "$45", "$48", "$42"],
            correctAnswer: "$45",
            explanation: "Discount = 10% of $50 = (10/100) × 50 = $5. Price after discount = $50 - $5 = $45."
          },
          {
            id: 248,
            question: "A refrigerator is priced at $800. A discount of 25% is offered. What is the price after the discount?",
            options: ["$600", "$650", "$700", "$550"],
            correctAnswer: "$600",
            explanation: "Discount = 25% of $800 = (25/100) × 800 = $200. Price after discount = $800 - $200 = $600."
          },
          {
            id: 249,
            question: "A printer is originally priced at $250. A 10% discount is given. What is the discounted price?",
            options: ["$225", "$240", "$220", "$230"],
            correctAnswer: "$225",
            explanation: "Discount = 10% of $250 = (10/100) × 250 = $25. Price after discount = $250 - $25 = $225."
          },
          {
            id: 250,
            question: "A bicycle is marked at $500. After a 20% discount, what is the discounted price?",
            options: ["$400", "$350", "$450", "$420"],
            correctAnswer: "$400",
            explanation: "Discount = 20% of $500 = (20/100) × 500 = $100. Price after discount = $500 - $100 = $400."
          }
          
    ]
  },
  
  // Pipes and Cistern category
  {
    category: "Pipes and Cistern",
    questions: [
        {
            id: 236,
            question: "A pipe can fill a tank in 6 hours, and another pipe can empty it in 8 hours. If both pipes are open, how long will it take to fill the tank?",
            options: ["24 hours", "48 hours", "12 hours", "18 hours"],
            correctAnswer: "24 hours",
            explanation: "The rate at which the tank fills is 1/6 per hour, and the rate at which it empties is 1/8 per hour. The net rate is (1/6 - 1/8) = 1/24. So, it will take 24 hours to fill the tank."
          },
          {
            id: 237,
            question: "A tank is being filled by two pipes, A and B. A can fill the tank in 10 hours, and B can fill it in 20 hours. If both pipes are open, how long will it take to fill the tank?",
            options: ["6 hours", "4 hours", "5 hours", "8 hours"],
            correctAnswer: "6 hours",
            explanation: "The rate at which A fills the tank is 1/10 per hour, and B fills it at 1/20 per hour. The combined rate is (1/10 + 1/20) = 3/20. Time = 1 / (3/20) = 6 hours."
          },
          {
            id: 238,
            question: "A tank is being emptied by a pipe in 10 hours. Another pipe fills the tank in 12 hours. If both pipes are open, how long will it take to fill the tank?",
            options: ["60 hours", "120 hours", "100 hours", "240 hours"],
            correctAnswer: "60 hours",
            explanation: "The emptying rate is 1/10 per hour and the filling rate is 1/12 per hour. The net rate is (1/12 - 1/10) = 1/60. So, it will take 60 hours to fill the tank."
          },
          {
            id: 239,
            question: "A tank is filled by two pipes, A and B, together in 15 hours. If A can fill the tank in 20 hours, how long will it take for B alone to fill the tank?",
            options: ["25 hours", "30 hours", "35 hours", "40 hours"],
            correctAnswer: "60 hours",
            explanation: "Let the rate of A be 1/20 and the rate of A and B together be 1/15. The rate of B alone is 1/15 - 1/20 = 1/60. So, B alone will take 60 hours."
          },
          {
            id: 240,
            question: "A cistern can be filled by two pipes, A and B, in 12 hours. Pipe A alone can fill the cistern in 20 hours. How long will it take for pipe B alone to fill the cistern?",
            options: ["30 hours", "40 hours", "24 hours", "60 hours"],
            correctAnswer: "60 hours",
            explanation: "The combined rate of A and B is 1/12. The rate of A is 1/20. The rate of B is 1/12 - 1/20 = 1/60. So, pipe B will take 60 hours to fill the cistern alone."
          },
          {
            id: 241,
            question: "A cistern is filled by two pipes, A and B, in 8 hours. Pipe A alone can fill the cistern in 12 hours. How long will it take for pipe B alone to fill the cistern?",
            options: ["24 hours", "32 hours", "20 hours", "48 hours"],
            correctAnswer: "24 hours",
            explanation: "The combined rate of A and B is 1/8. The rate of A is 1/12. The rate of B is 1/8 - 1/12 = 1/24. So, pipe B alone will take 24 hours."
          },
          {
            id: 242,
            question: "Two pipes, A and B, can fill a tank in 15 hours when open together. Pipe A alone can fill the tank in 20 hours. How long will it take for pipe B alone to fill the tank?",
            options: ["30 hours", "40 hours", "25 hours", "50 hours"],
            correctAnswer: "60 hours",
            explanation: "The combined rate is 1/15, the rate of A is 1/20, and the rate of B is 1/15 - 1/20 = 1/60. So, pipe B alone will take 60 hours."
          },
          {
            id: 243,
            question: "A cistern is filled by two pipes, A and B, together in 6 hours. Pipe A alone can fill the cistern in 4 hours. How long will it take for pipe B alone to fill the cistern?",
            options: ["8 hours", "12 hours", "10 hours", "20 hours"],
            correctAnswer: "12 hours",
            explanation: "The combined rate of A and B is 1/6. The rate of A is 1/4. The rate of B is 1/6 - 1/4 = 1/12. So, pipe B alone will take 12 hours."
          },
          {
            id: 244,
            question: "A tank can be filled by two pipes, A and B, in 8 hours. Pipe A alone can fill the tank in 10 hours. How long will it take for pipe B alone to fill the tank?",
            options: ["16 hours", "20 hours", "15 hours", "12 hours"],
            correctAnswer: "40 hours",
            explanation: "The combined rate is 1/8, the rate of A is 1/10, and the rate of B is 1/8 - 1/10 = 1/40. So, pipe B will take 40 hours."
          },
          {
            id: 245,
            question: "Two pipes, A and B, can fill a tank in 20 hours when open together. Pipe A alone can fill the tank in 30 hours. How long will it take for pipe B alone to fill the tank?",
            options: ["40 hours", "50 hours", "60 hours", "70 hours"],
            correctAnswer: "60 hours",
            explanation: "The combined rate is 1/20, the rate of A is 1/30, and the rate of B is 1/20 - 1/30 = 1/60. So, pipe B alone will take 60 hours."
          },
          {
            id: 246,
            question: "A tank is filled by two pipes, A and B, together in 12 hours. Pipe A alone can fill the tank in 24 hours. How long will it take for pipe B alone to fill the tank?",
            options: ["48 hours", "60 hours", "36 hours", "72 hours"],
            correctAnswer: "24 hours",
            explanation: "The combined rate is 1/12, the rate of A is 1/24, and the rate of B is 1/12 - 1/24 = 1/24. So, pipe B alone will take 24 hours."
          },
          {
            id: 247,
            question: "A pipe fills a tank in 8 hours, and another pipe empties it in 12 hours. How long will it take to fill the tank if both pipes are open?",
            options: ["24 hours", "48 hours", "36 hours", "60 hours"],
            correctAnswer: "24 hours",
            explanation: "The rate of filling is 1/8, and the rate of emptying is 1/12. The net rate is (1/8 - 1/12) = 1/24. So, it will take 24 hours to fill the tank."
          },
          {
            id: 248,
            question: "Two pipes, A and B, can fill a tank in 10 hours when open together. Pipe B alone can fill the tank in 15 hours. How long will it take for pipe A alone to fill the tank?",
            options: ["20 hours", "25 hours", "30 hours", "35 hours"],
            correctAnswer: "30 hours",
            explanation: "The combined rate of A and B is 1/10. The rate of B is 1/15. The rate of A is 1/10 - 1/15 = 1/30. So, pipe A alone will take 30 hours."
          },
          {
            id: 249,
            question: "A tank is filled by two pipes, A and B, together in 6 hours. Pipe A alone can fill the tank in 4 hours. How long will it take for pipe B alone to fill the tank?",
            options: ["8 hours", "12 hours", "10 hours", "20 hours"],
            correctAnswer: "12 hours",
            explanation: "The combined rate of A and B is 1/6. The rate of A is 1/4. The rate of B is 1/6 - 1/4 = 1/12. So, pipe B alone will take 12 hours."
          },
          {
            id: 250,
            question: "A tank can be filled by two pipes, A and B, in 10 hours. Pipe A alone can fill the tank in 5 hours. How long will it take for pipe B alone to fill the tank?",
            options: ["15 hours", "20 hours", "25 hours", "30 hours"],
            correctAnswer: "50 hours",
            explanation: "The combined rate is 1/10, the rate of A is 1/5, and the rate of B is 1/10 - 1/5 = 1/10. So, pipe B alone will take 50 hours."
          }
          
    ]
  },
  
  // Percentage category
  {
    category: "Percentage",
    questions: [
           {
              "id": 251,
              "question": "A student scored 75% marks in an exam. If the total marks were 600, how many marks did the student score?",
              "options": ["400", "450", "500", "550"],
              "correctAnswer": "450",
              "explanation": "Marks scored = 75% of 600 = 0.75 × 600 = 450."
            },
            {
              "id": 252,
              "question": "A product is sold at a discount of 20%. If the marked price is Rs. 500, what is the selling price?",
              "options": ["Rs. 400", "Rs. 450", "Rs. 480", "Rs. 520"],
              "correctAnswer": "Rs. 400",
              "explanation": "Discount = 20% of 500 = 100. Selling price = 500 - 100 = 400."
            },
            {
              "id": 253,
              "question": "A person buys an article for Rs. 1000 and sells it at a profit of 25%. What is the selling price?",
              "options": ["Rs. 1200", "Rs. 1250", "Rs. 1100", "Rs. 1300"],
              "correctAnswer": "Rs. 1250",
              "explanation": "Profit = 25% of 1000 = 250. Selling price = 1000 + 250 = 1250."
            },
            {
              "id": 254,
              "question": "A person invests Rs. 5000 at an interest rate of 6% per annum. What is the total interest after 2 years?",
              "options": ["Rs. 600", "Rs. 550", "Rs. 700", "Rs. 500"],
              "correctAnswer": "Rs. 600",
              "explanation": "Interest = Principal × Rate × Time / 100 = 5000 × 6 × 2 / 100 = 600."
            },
            {
              "id": 255,
              "question": "A company offers a 10% discount on a product marked Rs. 2000. What is the price after the discount?",
              "options": ["Rs. 1800", "Rs. 1900", "Rs. 1700", "Rs. 1600"],
              "correctAnswer": "Rs. 1800",
              "explanation": "Discount = 10% of 2000 = 200. Price after discount = 2000 - 200 = 1800."
            },
            {
              "id": 256,
              "question": "A product is sold at a loss of 15%. If the selling price is Rs. 850, what is the cost price?",
              "options": ["Rs. 1000", "Rs. 1200", "Rs. 1100", "Rs. 1050"],
              "correctAnswer": "Rs. 1000",
              "explanation": "Loss = 15%. Let cost price = x. Selling price = x × (1 - 0.15) = 0.85x = 850. Solving for x, we get x = 1000."
            },
            {
              "id": 257,
              "question": "A shopkeeper gives a discount of 15% on a product priced at Rs. 1500. What is the selling price?",
              "options": ["Rs. 1275", "Rs. 1300", "Rs. 1250", "Rs. 1350"],
              "correctAnswer": "Rs. 1275",
              "explanation": "Discount = 15% of 1500 = 225. Selling price = 1500 - 225 = 1275."
            },
            {
              "id": 258,
              "question": "A person invests Rs. 2000 at 8% annual interest. What is the interest after 1 year?",
              "options": ["Rs. 160", "Rs. 140", "Rs. 180", "Rs. 200"],
              "correctAnswer": "Rs. 160",
              "explanation": "Interest = Principal × Rate × Time / 100 = 2000 × 8 × 1 / 100 = 160."
            },
            {
              "id": 259,
              "question": "A student scores 45% marks in an exam. If the total marks are 500, how many marks did the student score?",
              "options": ["Rs. 225", "Rs. 250", "Rs. 200", "Rs. 275"],
              "correctAnswer": "Rs. 225",
              "explanation": "Marks scored = 45% of 500 = 0.45 × 500 = 225."
            },
            {
              "id": 260,
              "question": "A man sells a bicycle for Rs. 1200, incurring a loss of 20%. What is the cost price of the bicycle?",
              "options": ["Rs. 1500", "Rs. 1300", "Rs. 1400", "Rs. 1600"],
              "correctAnswer": "Rs. 1500",
              "explanation": "Loss = 20%. Let cost price = x. Selling price = x × (1 - 0.20) = 0.80x = 1200. Solving for x, we get x = 1500."
            },
            {
              "id": 261,
              "question": "A person buys an item at a price of Rs. 1200 and sells it at Rs. 1440. What is the percentage profit?",
              "options": ["20%", "25%", "15%", "30%"],
              "correctAnswer": "20%",
              "explanation": "Profit = Selling Price - Cost Price = 1440 - 1200 = 240. Profit percentage = (240/1200) × 100 = 20%."
            },
            {
              "id": 262,
              "question": "A product is sold at a profit of 18%. If the cost price is Rs. 850, what is the selling price?",
              "options": ["Rs. 1003", "Rs. 1000", "Rs. 1050", "Rs. 1100"],
              "correctAnswer": "Rs. 1003",
              "explanation": "Profit = 18% of 850 = 153. Selling price = 850 + 153 = 1003."
            },
            {
              "id": 263,
              "question": "A person invests Rs. 3000 at 5% annual interest. What is the total interest after 3 years?",
              "options": ["Rs. 450", "Rs. 500", "Rs. 550", "Rs. 600"],
              "correctAnswer": "Rs. 450",
              "explanation": "Interest = Principal × Rate × Time / 100 = 3000 × 5 × 3 / 100 = 450."
            },
            {
              "id": 264,
              "question": "A product is sold for Rs. 1200 with a 10% discount on the marked price. What is the marked price?",
              "options": ["Rs. 1300", "Rs. 1350", "Rs. 1400", "Rs. 1500"],
              "correctAnswer": "Rs. 1333.33",
              "explanation": "Selling price = Marked price - 10% of Marked price = Marked price × (1 - 0.10) = 0.90 × Marked price. So, 1200 = 0.90 × Marked price, Marked price = 1200 / 0.90 = 1333.33."
            },
            {
              "id": 265,
              "question": "A person invests Rs. 4000 at 10% annual interest. What will be the total amount after 2 years?",
              "options": ["Rs. 4800", "Rs. 4400", "Rs. 4200", "Rs. 5000"],
              "correctAnswer": "Rs. 4800",
              "explanation": "Interest = Principal × Rate × Time / 100 = 4000 × 10 × 2 / 100 = 800. Total amount = 4000 + 800 = 4800."
            },
            {
              "id": 266,
              "question": "A man buys an article for Rs. 2000 and sells it at a loss of 10%. What is the selling price?",
              "options": ["Rs. 1800", "Rs. 1900", "Rs. 1850", "Rs. 2000"],
              "correctAnswer": "Rs. 1800",
              "explanation": "Loss = 10% of 2000 = 200. Selling price = 2000 - 200 = 1800."
            }
          ]
  }
];

// Function to get random questions for a specific user, avoiding repeats until all are covered
export const getRandomQuestions = (n = 30, user = null) => {
  // Gather all questions flat
  const allQuestions = questionBank.flatMap(cat => {
    // Add category to each question
    return cat.questions.map(q => ({
      ...q,
      category: cat.category
    }));
  });
  
  let answeredIds = [];
  let userKey = null;
  if (user && user.email) {
    userKey = `answeredQuestions_${user.email}`;
    answeredIds = JSON.parse(localStorage.getItem(userKey) || '[]');
  }

  // Filter available questions
  let availableQuestions = allQuestions.filter(q => !answeredIds.includes(q.id));

  // If not enough questions left, reset the pool
  if (availableQuestions.length < n) {
    if (userKey) localStorage.setItem(userKey, JSON.stringify([]));
    availableQuestions = allQuestions;
    answeredIds = [];
  }

  // Shuffle and pick n random questions
  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  const result = shuffled.slice(0, n);

  // Update answered list in localStorage
  if (userKey) {
    const newAnsweredIds = Array.from(new Set([...answeredIds, ...result.map(q => q.id)]));
    localStorage.setItem(userKey, JSON.stringify(newAnsweredIds));
  }

  return result;
};

// Helper function to determine a question's category
function getQuestionCategory(question) {
  for (const categoryObj of questionBank) {
    if (categoryObj.questions.some(q => q.id === question.id)) {
      return categoryObj.category;
    }
  }
  return "Unknown";
}

// Function to get questions by specific categories
export const getQuestionsByCategories = (categories, n = 30) => {
  const filteredQuestions = questionBank
    .filter(category => categories.includes(category.category))
    .flatMap(category => category.questions);
  
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}; 