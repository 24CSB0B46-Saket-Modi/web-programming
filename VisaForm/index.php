<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visa Information Portal</title>
    <style>
        :root {
            --india-orange: #FF9933;
            --india-green: #138808;
            --india-white: #FFFFFF;
            --india-blue: #000080;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #fff5e6, #e6f3ff);
            min-height: 100vh;
        }

        nav {
            background: linear-gradient(to right, var(--india-orange), var(--india-white), var(--india-green));
            padding: 1.5rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            color: var(--india-blue);
            font-size: 1.8rem;
            font-weight: 700;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.3s;
        }

        .logo::before {
            content: "✈";
            font-size: 1.5rem;
        }

        .logo:hover {
            color: var(--india-white);
        }

        .menu-toggle {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 21px;
            cursor: pointer;
        }

        .menu-toggle span {
            display: block;
            width: 100%;
            height: 3px;
            background-color: var(--india-blue);
            border-radius: 3px;
            transition: all 0.3s ease;
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: 2rem;
            margin-left: auto;
            transition: all 0.3s ease-in-out;
        }

        nav a:not(.logo) {
            color: var(--india-blue);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            padding: 0.5rem 1rem;
            display: block;
            position: relative;
            border-radius: 5px;
        }

        nav a:not(.logo)::before {
            content: '▸';
            position: absolute;
            left: -1rem;
            opacity: 0;
            transition: all 0.3s ease;
            color: var(--india-white);
        }

        nav a:not(.logo):hover {
            color: var(--india-white);
            transform: translateX(0.5rem);
            background-color: var(--india-blue);
        }

        nav a:not(.logo):hover::before {
            opacity: 1;
            transform: translateX(0.5rem);
        }

        @media screen and (max-width: 768px) {
            .menu-toggle {
                display: flex;
            }

            nav ul {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: linear-gradient(to bottom, var(--india-orange), var(--india-white), var(--india-green));
                padding: 1.5rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                z-index: 1000;
                margin-left: 0;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
            }

            nav ul.active {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }

            nav ul li {
                text-align: center;
                margin: 0.5rem 0;
            }

            nav a:not(.logo) {
                padding: 0.8rem 1rem;
                margin: 0.3rem 0;
            }

            nav a:not(.logo):hover {
                transform: translateX(0.3rem);
            }

            .container {
                margin: 1rem;
                padding: 1rem;
            }

            h1 {
                font-size: 2rem;
            }
        }

        .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        h1 {
            color: var(--india-blue);
            text-align: center;
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }

        .description {
            text-align: center;
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .regulations-box {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            margin-bottom: 2rem;
            overflow: hidden;
        }

        .regulations-header {
            background: #e9ecef;
            padding: 0.8rem 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            color: var(--india-blue);
        }

        .regulations-header:hover {
            background: #dee2e6;
        }

        .regulations-content {
            padding: 1rem;
            display: none;
            border-top: 1px solid #dee2e6;
        }

        .regulations-content.active {
            display: block;
        }

        .regulations-content ul {
            list-style-type: none;
            padding-left: 1rem;
        }

        .regulations-content li {
            margin-bottom: 0.5rem;
            position: relative;
        }

        .regulations-content li:before {
            content: "•";
            color: var(--india-orange);
            font-weight: bold;
            position: absolute;
            left: -1rem;
        }

        .toggle-icon {
            transition: transform 0.3s ease;
        }

        .toggle-icon.active {
            transform: rotate(180deg);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--india-blue);
            font-weight: 600;
        }

        input, select {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        input:focus, select:focus {
            border-color: var(--india-orange);
            outline: none;
        }

        .error-message {
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 0.3rem;
            display: none;
        }

        .success-message {
            color: #28a745;
            font-size: 0.9rem;
            margin-top: 0.3rem;
            display: none;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 90%;
            text-align: center;
        }

        .modal-title {
            color: var(--india-blue);
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .modal-message {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .modal-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }

        .modal-button {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .modal-button.confirm {
            background: var(--india-green);
            color: white;
        }

        .modal-button.cancel {
            background: #dc3545;
            color: white;
        }

        .modal-button:hover {
            transform: translateY(-2px);
        }

        button {
            background: linear-gradient(to right, var(--india-orange), var(--india-green));
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: transform 0.3s;
            display: block;
            margin: 1rem auto;
        }

        button:hover {
            transform: translateY(-2px);
        }

        #result {
            margin-top: 2rem;
            padding: 1rem;
            border-radius: 5px;
            text-align: center;
            font-size: 1.2rem;
            min-height: 60px;
        }

        .footer {
            text-align: center;
            padding: 2rem;
            background: linear-gradient(to right, var(--india-orange), var(--india-white), var(--india-green));
            color: var(--india-blue);
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <nav>
        <a href="#" class="logo">VisaInfo</a>
        <div class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>
            <li><a href="https://indianvisaonline.gov.in/visa/" target="_blank">Official Visa Portal</a></li>
            <li><a href="https://www.mea.gov.in/visa-services.htm" target="_blank">Visa Services</a></li>
            <li><a href="https://www.india.gov.in/topics/travel-tourism" target="_blank">Travel & Tourism</a></li>
        </ul>
    </nav>

    <div class="container">
        <h1>Visa Information Portal</h1>
        <p class="description">
            Welcome to the Visa Information Portal. This tool helps you quickly check basic visa requirements for various countries. 
            Simply select your destination country from the dropdown menu below to view the visa requirements.
        </p>

        <div class="regulations-box">
            <div class="regulations-header">
                <span>Important Regulations and Guidelines</span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="regulations-content">
                <ul>
                    <li>This portal provides general information only. Always verify requirements with official government sources.</li>
                    <li>Visa requirements may vary based on your nationality and purpose of travel.</li>
                    <li>Processing times and fees are not included in this information.</li>
                    <li>Some countries may require additional documentation or specific visa types.</li>
                    <li>Travel restrictions and requirements may change without notice.</li>
                </ul>
            </div>
        </div>

        <form id="visaForm">
            <div class="form-group">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required>
                <div class="error-message" id="nameError"></div>
            </div>

            <div class="form-group">
                <label for="passport">Passport Number:</label>
                <input type="text" id="passport" name="passport" required>
                <div class="error-message" id="passportError"></div>
            </div>

            <div class="form-group">
                <label for="country">Select Country:</label>
                <select id="country" name="country" required>
                    <option value="">Please select a country</option>
                    <option value="USA">United States of America</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                </select>
                <div class="error-message" id="countryError"></div>
            </div>

            <button type="submit">Apply for Visa</button>
            <div class="success-message" id="successMessage">Visa application submitted successfully!</div>
        </form>
        <div id="result"></div>
    </div>

    <footer class="footer">
        <p>© 2024 Visa Information Portal | For official information, please visit the government websites linked above.</p>
    </footer>

    <!-- Add Modal Dialog -->
    <div class="modal" id="visaInfoModal">
        <div class="modal-content">
            <h2 class="modal-title">Confirm Visa Information</h2>
            <p class="modal-message" id="modalMessage"></p>
            <div class="modal-buttons">
                <button class="modal-button confirm" onclick="confirmVisaApplication()">
                    <span>✓</span> Confirm
                </button>
                <button class="modal-button cancel" onclick="cancelVisaApplication()">
                    <span>✕</span> Cancel
                </button>
            </div>
        </div>
    </div>

    <script>
        const regulationsHeader = document.querySelector('.regulations-header');
        const regulationsContent = document.querySelector('.regulations-content');
        const toggleIcon = document.querySelector('.toggle-icon');

        regulationsHeader.addEventListener('click', () => {
            regulationsContent.classList.toggle('active');
            toggleIcon.classList.toggle('active');
        });

        const visaInfo = {
            'USA': 'Visa required for most applicants.',
            'Canada': 'Visa required unless you have an eTA.',
            'India': 'Visa required before travel.',
            'UK': 'Visa depends on the duration of stay.',
            'Australia': 'eVisa available for eligible travelers.'
        };

        // Modal functionality
        const modal = document.getElementById('visaInfoModal');
        const modalMessage = document.getElementById('modalMessage');
        let formData = null;

        function showVisaInfoModal(country) {
            modalMessage.textContent = visaInfo[country] || 'Please select a country.';
            modal.style.display = 'flex';
            formData = { country };
        }

        function confirmVisaApplication() {
            modal.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('visaForm').reset();
        }

        function cancelVisaApplication() {
            modal.style.display = 'none';
        }

        // Mobile menu functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('nav ul');
        const menuSpans = document.querySelectorAll('.menu-toggle span');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate hamburger icon
            menuSpans[0].style.transform = menuToggle.classList.contains('active') 
                ? 'translateY(9px) rotate(45deg)' 
                : 'none';
            menuSpans[1].style.opacity = menuToggle.classList.contains('active') 
                ? '0' 
                : '1';
            menuSpans[2].style.transform = menuToggle.classList.contains('active') 
                ? 'translateY(-9px) rotate(-45deg)' 
                : 'none';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset hamburger icon
                menuSpans[0].style.transform = 'none';
                menuSpans[1].style.opacity = '1';
                menuSpans[2].style.transform = 'none';
            }
        });

        // Form validation
        document.getElementById('visaForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const passport = document.getElementById('passport').value;
            const country = document.getElementById('country').value;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            document.getElementById('successMessage').style.display = 'none';
            
            let isValid = true;
            
            // Validate name
            if (!name.trim()) {
                document.getElementById('nameError').textContent = 'All fields are required!';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validate passport
            if (!passport.trim()) {
                document.getElementById('passportError').textContent = 'All fields are required!';
                document.getElementById('passportError').style.display = 'block';
                isValid = false;
            } else if (passport.length < 8 || passport.length > 10) {
                document.getElementById('passportError').textContent = 'Invalid passport number!';
                document.getElementById('passportError').style.display = 'block';
                isValid = false;
            }
            
            // Validate country
            if (!country) {
                document.getElementById('countryError').textContent = 'All fields are required!';
                document.getElementById('countryError').style.display = 'block';
                isValid = false;
            }
            
            // If all validations pass, show the visa info modal
            if (isValid) {
                showVisaInfoModal(country);
            }
        });
    </script>
</body>
</html> 
