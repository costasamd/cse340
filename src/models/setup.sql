CREATE TABLE organization(
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


CREATE TABLE service_projects(
    project_id SERIAL PRIMARY KEY,
    organization_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization (organization_id)
);


INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES (1, 'Argonaut Planter Boxes', 'We will build planter boxes at Argonaut Elementary School.', 'Argonaut Elementary School', '2026-03-24'),
	(1, 'Rinconada Park Fences', 'We will install new fences at Rinconada Park', 'Rinconada Park', '2027-04-23'),
	(1, 'Rinconada Park Playground', 'Building a new playground at Rinconada Park', 'Rinconada Park', '2027-04-23'),
	(1, 'Community Garden Shed', 'We will build a shed for gardening tools at Green Valley Community Garden', 'Green Valley Community Garden', '2026-05-15'),
	(1, 'Local Library Renovation', 'We will renovate the community library to create a better learning space', 'Downtown Public Library', '2026-06-10'),
	(2, 'Urban Farm Workshop', 'We will host a workshop on sustainable farming practices in the city', 'City Hall Community Center', '2026-07-14'),
	(2, 'Pollinator Garden', 'We will plant a pollinator garden to support local bees and butterflies', 'Sunny Meadows Park', '2026-08-20'),
	(2, 'Hydroponic System Installation', 'We will install a hydroponic system at the local high school for educational purposes', 'Lincoln High School', '2026-09-12'),
	(2, 'Community Composting Program', 'We will initiate a composting program to reduce waste and enrich soil', 'City Community Recycling Center', '2026-09-30'),
	(2, 'Farm-to-Table Dinner', 'We will organize a farm-to-table dinner to raise funds and awareness for urban farming', 'Central City Pavilion', '2026-10-25'),
	(3, 'Annual Charity Walk', 'We will organize a charity walk to raise funds for local shelters', 'City Park', '2026-11-05'),
	(3, 'Clothing Drive', 'We will collect and distribute clothing to families in need', 'Community Center', '2026-12-03'),
	(3, 'Food Pantry Setup', 'We will set up a food pantry to support low-income families in our community', 'Local Elementary School', '2027-01-10'),
	(3, 'Book Donation Campaign', 'We will collect and donate books to underprivileged children', 'Local Library', '2027-02-15'),
	(3, 'Toys for Tots Drive', 'We will organize a toy drive to provide gifts for children in need during the holidays', 'City Hall', '2027-03-01');

CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

INSERT INTO categories (name)
VALUES
	('Public area'),
	('Family service'),
	('Education sector'),
	('Children support');

CREATE TABLE project_cat(
	project_id INT,
	category_id INT,

	PRIMARY KEY(project_id, category_id),

	FOREIGN KEY (project_id) REFERENCES service_projects (project_id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE
);

INSERT INTO project_cat(project_id, category_id)
VALUES
(2,1), (3,1), (4,1), (5,1), (7,1), (11,1), (4,2), (5,2), (6,2), (12,2), (13,2), (14,2), (15,2),
(5,3), (6,3), (8,3), (5,4), (14,4), (15,4), (1,3), (9,1), (10,3); 
