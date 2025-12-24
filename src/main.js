import './style.css'

// GitHub Configuration
const GITHUB_USERNAME = 'Januda-lelwala'; // Update with your actual GitHub username

// Fetch GitHub repositories
async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    const repos = await response.json();
    
    // Filter out forks and sort by stars/updated date
    const filteredRepos = repos
      .filter(repo => !repo.fork) // Exclude forked repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));
    
    displayProjects(filteredRepos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Keep the placeholder projects if fetch fails
  }
}

// Display projects in the grid
function displayProjects(repos) {
  const projectsGrid = document.querySelector('.projects-grid');
  
  if (!projectsGrid || repos.length === 0) return;
  
  projectsGrid.innerHTML = repos.map(repo => `
    <div class="project-card">
      <div class="project-image">
        ${repo.language || 'Project'}
      </div>
      <h3>${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
      <p>${repo.description || 'No description available'}</p>
      <div class="project-meta">
        ${repo.language ? `<span class="project-lang">📝 ${repo.language}</span>` : ''}
        ${repo.stargazers_count > 0 ? `<span class="project-stars">⭐ ${repo.stargazers_count}</span>` : ''}
      </div>
      <div class="project-links">
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn-small">View Demo</a>` : ''}
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn-small">GitHub</a>
      </div>
    </div>
  `).join('');
}

// Load projects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
} else {
  fetchGitHubRepos();
}

console.log('Dev page loaded successfully!')
