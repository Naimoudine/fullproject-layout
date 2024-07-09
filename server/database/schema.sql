create table Users (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  is_admin boolean not null default false
);

create table Consultations (
  id int unsigned primary key auto_increment not null,
  startingTime timestamp not null,
  endingTime timestamp not null,
  user_id int unsigned,
  foreign key(user_id) references Users(id)
)