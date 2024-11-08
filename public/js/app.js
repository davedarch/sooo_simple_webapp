document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wordForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          alert('Word added successfully!');
          this.reset();
        } else {
          alert('Failed to add word.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
    });
  }
});
