// searchbar function

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
      
const supabase = createClient('https://wrvqdlwfcyioolletboe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydnFkbHdmY3lpb29sbGV0Ym9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTA3NDksImV4cCI6MjA2NDI4Njc0OX0.O-vWxkGJcVIa9ZwlMgD63sWiOJ_ckZ1Q-ogGMkkL9ws');

window.searchCases = async function() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // clear old results


  // Query Supabase
  const { data, error } = await supabase
    .from('ai-legal-cases')
    .select('slug, title')
    .ilike('title', `%${query}%`);

    if (error) {
    resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    return;
  }

  if (data.length === 0) {
    resultsDiv.innerHTML = '<p>No cases found.</p>';
    return;
  }

  data.forEach(caseItem => {
    const link = document.createElement('a');
    link.href = `template.html?slug=${encodeURIComponent(caseItem.slug)}`;
    link.textContent = caseItem.title;
    link.style.display = 'block'; // make each link on its own line
    link.style.margin = '8px 0';

    resultsDiv.appendChild(link);
  });
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      searchCases();
    }
});
