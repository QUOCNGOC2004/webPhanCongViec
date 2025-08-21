-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#15803d',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'leader', 'member', 'viewer'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'on_hold'
  progress INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo', -- 'todo', 'in_progress', 'done'
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create task assignments table
CREATE TABLE IF NOT EXISTS public.task_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'in_progress', 'completed'
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(task_id, assigned_to)
);

-- Create task comments table
CREATE TABLE IF NOT EXISTS public.task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for teams
CREATE POLICY "Users can view teams they belong to" ON public.teams FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = teams.id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can create teams" ON public.teams FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Team leaders can update teams" ON public.teams FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = teams.id AND user_id = auth.uid() AND role = 'leader'
  ));

-- RLS Policies for team_members
CREATE POLICY "Users can view team members of their teams" ON public.team_members FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.team_members tm 
    WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid()
  ));
CREATE POLICY "Team leaders can manage members" ON public.team_members FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = team_members.team_id AND user_id = auth.uid() AND role = 'leader'
  ));

-- RLS Policies for projects
CREATE POLICY "Users can view projects of their teams" ON public.projects FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = projects.team_id AND user_id = auth.uid()
  ));
CREATE POLICY "Team members can create projects" ON public.projects FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = projects.team_id AND user_id = auth.uid()
  ));
CREATE POLICY "Team leaders can update projects" ON public.projects FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = projects.team_id AND user_id = auth.uid() AND role IN ('leader', 'member')
  ));

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks of their projects" ON public.tasks FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    JOIN public.team_members tm ON p.team_id = tm.team_id
    WHERE p.id = tasks.project_id AND tm.user_id = auth.uid()
  ));
CREATE POLICY "Users can create tasks" ON public.tasks FOR INSERT 
  WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update tasks they created or are assigned to" ON public.tasks FOR UPDATE 
  USING (auth.uid() = created_by OR auth.uid() = assigned_to);

-- RLS Policies for task_assignments
CREATE POLICY "Users can view assignments related to them" ON public.task_assignments FOR SELECT 
  USING (auth.uid() = assigned_to OR auth.uid() = assigned_by);
CREATE POLICY "Users can create assignments" ON public.task_assignments FOR INSERT 
  WITH CHECK (auth.uid() = assigned_by);
CREATE POLICY "Assigned users can update their assignments" ON public.task_assignments FOR UPDATE 
  USING (auth.uid() = assigned_to);

-- RLS Policies for task_comments
CREATE POLICY "Users can view comments on accessible tasks" ON public.task_comments FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.tasks t
    JOIN public.projects p ON t.project_id = p.id
    JOIN public.team_members tm ON p.team_id = tm.team_id
    WHERE t.id = task_comments.task_id AND tm.user_id = auth.uid()
  ));
CREATE POLICY "Users can create comments" ON public.task_comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
