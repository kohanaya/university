create table student
(
    id        int auto_increment primary key,
    full_name varchar(30) null,
    address   varchar(50) null
);

create table course
(
    id       int auto_increment primary key,
    name     varchar(50)            not null,
    number   varchar(5)             null,
    location enum ('WEB', 'CAMPUS') null,
    time     varchar(50)            null
);

create table enrollment
(
    id         int auto_increment primary key,
    student_id int not null,
    course_id  int not null,

    constraint fk_enrollment_student
        foreign key (student_id)
            references student (id)
            on delete cascade,

    constraint fk_enrollment_class
        foreign key (course_id)
            references course (id)
            on delete cascade
);

create table activity
(
    id           int auto_increment primary key,
    type         enum ('QUIZ', 'ASSIGNMENT', 'EXAM') not null,
    title        varchar(50)                         not null,
    max_points   int                                 null,
    due_date     datetime                            null,
    instructions text                                null,
    course_id    int                                 not null,

    constraint fk_activity_class
        foreign key (course_id)
            references course (id)
            on delete cascade
);

create table submission
(
    id          int auto_increment primary key,
    student_id  int  not null,
    activity_id int  not null,
    document    text null,
    score       int  null,

    constraint fk_submission_activity
        foreign key (activity_id)
            references activity (id)
            on delete cascade,

    constraint fk_submission_student
        foreign key (student_id)
            references student (id)
            on delete cascade
);

-- delete from student where id = 5;

-- TEST DATA

insert into student(id, full_name, address)
values (1, 'Kirsten Rivera', '39 Little Street, Akron, OH 44311'),
       (2, 'Barbara Enriquez', '3260 O Conner Street, Gulfport, MS 39501'),
       (3, 'Roy Johnson', '4570 Elk Street, Rancho Santa Margarita, CA 92688'),
       (4, 'James Gray', '4037 Hedge Street, Rochelle Park, NJ 07662');

insert into course(id, number, name, location, time)
values (1, 'CS640', 'Advance database systems', 'campus', 'Mon 8:30am, Fri 10:00am'),
       (2, 'CS500', 'Fundamentals of Programming', 'campus', 'Tue 8:30am, Thu 09:00am'),
       (3, 'CS50', 'Introduction to Computer Science', 'web', 'Tue 12:00pm, Thu 09:00am');


-- Class 1 - CS640
insert into activity(id, type, title, max_points, due_date, instructions, course_id)
values (1, 'quiz', 'Quiz 1', 50, '2021-12-01', 'pass the quiz', 1),
       (2, 'assignment', 'Assignment 1', 100, '2021-12-05', 'submit the document', 1),
       (3, 'assignment', 'Assignment 2', 100, '2021-12-10', 'submit the document', 1),
       (4, 'exam', 'Exam 1', 100, '2021-12-10', 'pass the exam', 1);

-- Class 2 - CS500
insert into activity(id, type, title, max_points, due_date, instructions, course_id)
values (5, 'quiz', 'Quiz 1', 50, '2021-12-01', 'pass the quiz', 2),
       (6, 'quiz', 'Quiz 2', 50, '2021-12-05', 'pass the quiz', 2),
       (7, 'assignment', 'Assignment 1', 100, '2021-12-10', 'submit the document', 2);

-- Class 3 - CS50
insert into activity(id, type, title, max_points, due_date, instructions, course_id)
values (8, 'assignment', 'Assignment 1', 50, '2021-12-01', 'submit the document', 3),
       (9, 'assignment', 'Assignment 2', 50, '2021-12-05', 'submit the document', 3),
       (10, 'assignment', 'Assignment 3', 50, '2021-12-08', 'submit the document', 3),
       (11, 'exam', 'Exam 1', 100, '2021-12-10', 'pass the exam', 3);

insert into enrollment(id, student_id, course_id)
values (1, 1, 1), -- Kirsten - CS640
       (2, 1, 2), -- Kirsten - CS500
       (3, 1, 3), -- Kirsten - CS50
       (4, 2, 1), -- Barbara - CS640
       (5, 2, 2), -- Barbara - CS500
       (6, 3, 1), -- Roy - CS640
       (7, 3, 3), -- Roy - CS50
       (8, 4, 2); -- James - CS500

insert into submission(id, student_id, activity_id, document, score)
values (1, 1, 1, 'nkjnkjn', 45),
       (2, 1, 2, 'oooooo', 95),
       (3, 1, 3, 'kkkkkk', 80),
       (4, 1, 4, 'hhhh', 100),
       (5, 1, 7, 'tttttt', 39),
       (6, 1, 8, 'hhhhhh', 49),
       (7, 1, 9, 'gjhgjgh', 90),
       (8, 1, 10, 'gjgjhg', 50),
       (9, 1, 11, 'ututut', 95),
       (10, 2, 1, 'hhhh', 40),
       (11, 2, 2, 'oooooo', 90),
       (12, 2, 3, 'kkkkkk', 90),
       (13, 2, 5, 'hdbgkdb', 50),
       (14, 2, 6, 'tttttt', 50),
       (15, 2, 7, 'hhhhhh', 69),
       (16, 3, 1, 'gjhgjgh', 90),
       (17, 3, 2, 'gjgjhg', 50),
       (18, 3, 3, 'ututut', 95),
       (19, 3, 4, 'ututut', 95),
       (20, 2, 4, 'kkkkkk', 100),
       (21, 3, 9, 'gjhgjgh', 40),
       (22, 3, 10, 'gjgjhg', 40),
       (23, 3, 11, 'ututut', 90),
       (24, 4, 5, 'tttttt', 50),
       (25, 4, 6, 'hhhhhh', 50),
       (26, 4, 7, 'hhhhhh', 100);


