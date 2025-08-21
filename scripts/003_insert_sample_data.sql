-- Insert sample data for testing the task management system
-- Run this after users have signed up through the authentication system

-- Note: This script assumes you have at least one user registered
-- You can get user IDs from the auth.users table or profiles table

-- Sample teams (replace user_id with actual user ID from your auth.users table)
-- INSERT INTO public.teams (name, description, color, created_by) VALUES
-- ('Development Team', 'Main development team for web applications', '#15803d', 'your-user-id-here'),
-- ('Design Team', 'UI/UX design and creative team', '#84cc16', 'your-user-id-here'),
-- ('Marketing Team', 'Marketing and growth team', '#f59e0b', 'your-user-id-here');

-- Sample projects (replace team_id and created_by with actual IDs)
-- INSERT INTO public.projects (name, description, team_id, status, progress, start_date, end_date, created_by) VALUES
-- ('Website Redesign', 'Complete redesign of company website', 'team-id-here', 'active', 25, '2024-01-01', '2024-03-31', 'user-id-here'),
-- ('Mobile App Development', 'Develop mobile app for iOS and Android', 'team-id-here', 'active', 60, '2024-02-01', '2024-06-30', 'user-id-here');

-- Sample tasks (replace project_id, assigned_to, and created_by with actual IDs)
-- INSERT INTO public.tasks (title, description, status, priority, project_id, assigned_to, created_by, due_date) VALUES
-- ('Design Homepage Layout', 'Create wireframes and mockups for new homepage', 'todo', 'high', 'project-id-here', 'user-id-here', 'user-id-here', '2024-01-15 23:59:59+00'),
-- ('Implement User Authentication', 'Set up user login and registration system', 'in_progress', 'urgent', 'project-id-here', 'user-id-here', 'user-id-here', '2024-01-20 23:59:59+00'),
-- ('Database Schema Design', 'Design and implement database schema', 'done', 'medium', 'project-id-here', 'user-id-here', 'user-id-here', '2024-01-10 23:59:59+00');

-- Instructions:
-- 1. First, register users through your application's signup page
-- 2. Get the user IDs from the profiles table: SELECT id, email FROM public.profiles;
-- 3. Replace 'your-user-id-here' with actual user IDs in the INSERT statements above
-- 4. Uncomment and run the INSERT statements to create sample data
-- 5. Create team memberships: INSERT INTO public.team_members (team_id, user_id, role) VALUES ('team-id', 'user-id', 'leader');

-- Query to check your data after insertion:
-- SELECT 
--   t.name as team_name,
--   p.name as project_name,
--   tk.title as task_title,
--   tk.status,
--   tk.priority,
--   pr.display_name as assigned_to
-- FROM public.teams t
-- LEFT JOIN public.projects p ON t.id = p.team_id
-- LEFT JOIN public.tasks tk ON p.id = tk.project_id
-- LEFT JOIN public.profiles pr ON tk.assigned_to = pr.id
-- ORDER BY t.name, p.name, tk.created_at;
