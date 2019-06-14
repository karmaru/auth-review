insert into users
(email, password)
values (${email}, ${password})
returning email, user_id;