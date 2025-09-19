// services/mockCourseData.ts
export const mockCourseData = {
  title: "Master Git in 5 Days",
  duration: "5 Days",
  summary: "Learn Git from scratch with a structured, hands-on approach. Each day focuses on core concepts, practical exercises, and curated resources to build real skills.",
  totalLessons: 15,
  estimatedTime: "2-3 hours/day",
  days: [
    {
      day: 1,
      title: "Introduction & Setup",
      goals: [
        "Understand version control basics",
        "Install Git and set up environment",
        "Create your first repository"
      ],
      concepts: [
        "What is Git",
        "Difference between Git and GitHub",
        "Repository structure"
      ],
      exercises: [
        "Install Git on your machine",
        "Initialize a new repo",
        "Create a README file"
      ]
    },
    {
      day: 2,
      title: "Basic Git Commands",
      goals: [
        "Learn core Git commands",
        "Understand commit lifecycle",
        "Practice creating commits"
      ],
      concepts: [
        "git init, git add, git commit",
        "Commit messages best practices",
        "Staging vs committing"
      ],
      exercises: [
        "Add files to staging",
        "Make first commit",
        "Check commit history"
      ]
    },
    {
      day: 3,
      title: "Branching & Merging",
      goals: [
        "Learn how to create and manage branches",
        "Understand merge conflicts",
        "Collaborate on feature branches"
      ],
      concepts: [
        "git branch, git checkout",
        "Merging vs Rebasing",
        "Conflict resolution"
      ],
      exercises: [
        "Create a feature branch",
        "Make changes and merge back",
        "Resolve a merge conflict"
      ]
    },
    {
      day: 4,
      title: "Remote Repositories",
      goals: [
        "Push and pull changes from remote",
        "Understand pull requests",
        "Collaborate with a team"
      ],
      concepts: [
        "git remote, git push, git pull",
        "Cloning repos",
        "GitHub workflow"
      ],
      exercises: [
        "Push local repo to GitHub",
        "Clone a remote repo",
        "Open a pull request"
      ]
    },
    {
      day: 5,
      title: "Advanced Topics",
      goals: [
        "Explore Git workflows",
        "Learn cherry-pick and stash",
        "Plan further learning"
      ],
      concepts: [
        "Feature branching workflow",
        "Git stash and cherry-pick",
        "Best practices in professional projects"
      ],
      exercises: [
        "Practice stashing changes",
        "Apply cherry-pick",
        "Create a learning roadmap"
      ]
    }
  ],
  resources: [
    {
      title: "Git & GitHub Crash Course",
      type: "video",
      url: "https://youtube.com/watch?v=HkdAHXoRtos",
      description: "Step-by-step Git tutorial with practical examples"
    },
    {
      title: "Pro Git Book",
      type: "pdf",
      url: "https://git-scm.com/book/en/v2",
      description: "Comprehensive reference book for Git concepts and commands"
    },
    {
      title: "GitHub Guides",
      type: "article",
      url: "https://guides.github.com",
      description: "Official GitHub tutorials and best practices"
    }
  ]
};
