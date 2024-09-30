// Fake data for charts
const monthlySales = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Monthly Sales',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1
    }]
};

const categorySales = {
    labels: ['Electronics', 'Kitchen', 'Furniture', 'Gaming'],
    datasets: [{
        label: 'Sales by Category',
        data: [30, 25, 20, 25],
        backgroundColor: [
            'rgba(52, 152, 219, 0.6)',
            'rgba(46, 204, 113, 0.6)',
            'rgba(155, 89, 182, 0.6)',
            'rgba(230, 126, 34, 0.6)'
        ],
        borderColor: [
            'rgba(52, 152, 219, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(155, 89, 182, 1)',
            'rgba(230, 126, 34, 1)'
        ],
        borderWidth: 1
    }]
};

// Create charts
function createCharts() {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: monthlySales,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Sales'
                }
            }
        }
    });

    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: categorySales,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales by Category'
                }
            }
        }
    });
}

// Fake user comments
const userComments = [
    {
        author: 'John Doe',
        date: '2024-09-25',
        content: 'Great selection of products! I found exactly what I was looking for.'
    },
    {
        author: 'Jane Smith',
        date: '2024-09-24',
        content: 'The customer service is excellent. They helped me resolve an issue quickly.'
    },
    {
        author: 'Mike Johnson',
        date: '2024-09-23',
        content: 'Fast shipping and high-quality items. Will definitely shop here again!'
    }
];

// Display user comments
function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    userComments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-content">${comment.content}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createCharts();
    displayComments();
});