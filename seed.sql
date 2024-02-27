-- for clients table:
INSERT INTO clients (first_name, last_name, email, phone_number, other_details) VALUES
  ('Sarah', 'Miller', 'sarah.miller@example.com', '(555) 555-1212', 'New patient, referred by Dr. Jones'),
  ('Michael', 'Johnson', 'michael.johnson@example.com', '(555) 555-3434', 'Follow-up visit for depression'),
  ('Emily', 'Garcia', 'emily.garcia@example.com', '(555) 555-5656', 'Initial consultation for anxiety'),
  ('David', 'Lee', 'david.lee@example.com', '(555) 555-7878', 'Returning patient for stress management'),
  ('Olivia', 'Hernandez', 'olivia.hernandez@example.com', '(555) 555-9090', 'Seeking help with relationship issues'),
  ('Noah', 'Williams', 'noah.williams@example.com', '(555) 555-0101', 'Concerned about addiction recovery'),
  ('Sophia', 'Brown', 'sophia.brown@example.com', '(555) 555-2323', 'Coping with grief and loss'),
  ('Matthew', 'Davis', 'matthew.davis@example.com', '(555) 555-4545', 'Managing ADHD symptoms'),
  ('Chloe', 'Wright', 'chloe.wright@example.com', '(555) 555-6767', 'Career counseling and goal setting'),
  ('Lucas', 'Lopez', 'lucas.lopez@example.com', '(555) 555-8989', 'Seeking support for eating disorders'),
  ('Ava', 'Moore', 'ava.moore@example.com', '(555) 555-0000', 'Prenatal anxiety and depression'),
  ('Daniel', 'Clark', 'daniel.clark@example.com', '(555) 555-1234', 'Post-traumatic stress disorder (PTSD) treatment'),
  ('Isabella', 'Wilson', 'isabella.wilson@example.com', '(555) 555-3456', 'Trauma-informed therapy'),
  ('Elijah', 'Rodriguez', 'elijah.rodriguez@example.com', '(555) 555-5678', 'Coping with chronic pain'),
  ('Amelia', 'Allen', 'amelia.allen@example.com', '(555) 555-1313', 'Seeking help with anger management');

-- for sessions table:
INSERT INTO sessions (duration, started_at, ended_at, client_id, comments) VALUES
  ('00:30:00':, '2024-01-29 14:00:00', '2024-01-29 14:30:00', 1, 'Initial intake and assessment'),
  ('01:00:00':, '2024-01-30 10:00:00', '2024-01-30 11:00:00', 2, 'Depression management strategies'),
  ('00:45:00':, '2024-01-31 15:00:00', '2024-01-31 15:45:00', 3, 'Anxiety reduction techniques and relaxation exercises'),
  ('00:50:00':, '2024-02-01 09:00:00', '2024-02-01 09:50:00', 4, 'Stress management plan and coping mechanisms'),
  ('01:15:00':, '2024-02-02 13:00:00', '2024-02-02 14:15:00', 5, 'Couples therapy session focusing on communication'),
  ('01:00:00':, '2024-02-03 10:00:00', '2024-02-03 11:00:00', 6, 'Substance abuse recovery support and group therapy discussion'),
  ('00:45:00':, '2024-02-04 14:00:00', '2024-02-04 14:45:00', 7, 'Grief and loss counseling and emotional support'),
  ('01:00:00':, '2024-02-05 09:00:00', '2024-02-05 10:00:00', 8, 'ADHD coaching strategies and organizational skills development'),
  ('00:50:00':, '2024-02-06 12:00:00', '2024-02-06 12:50:00', 9, 'Career counseling and job search preparation'),
  ('01:15:00':, '2024-02-07 13:00:00', '2024-02-07 14:15:00', 10, 'Eating disorder treatment plan and nutritional guidance'),
  ('01:00:00':, '2024-02-08 10:00:00', '2024-02-08 11:00:00', 11, 'Prenatal anxiety management and relaxation techniques'),
  ('01:00:00':, '2024-02-09 09:00:00', '2024-02-09 10:00:00', 12, 'PTSD therapy session and exposure techniques'),
  ('00:30:00':, '2024-02-10 14:00:00', '2024-02-10 14:30:00', 14, 'Follow-up session for initial assessment'),
  ('01:15:00':, '2024-02-12 10:00:00', '2024-02-12 11:15:00', 8, 'ADHD medication management discussion'),
  ('00:50:00':, '2024-02-13 14:00:00', '2024-02-13 14:50:00', 15, 'Couples therapy session focusing on conflict resolution');




