create table otus_dev.areasOfInterest (
  areaOfInterest varchar(64) not null primary key,
  constraint areasOfInterest_value_uindex unique (areaOfInterest)
);
create table otus_dev.users (
  email varchar(255) not null primary key,
  password varchar(255) not null,
  constraint email_unique unique (email)
);
create table otus_dev.pages (
  email varchar(255) not null primary key,
  firstName varchar(64) not null,
  lastName varchar(64) not null,
  city varchar(64) not null,
  gender enum('MALE', 'FEMALE') not null,
  age int not null,
  constraint pages_users_email_fk foreign key (email) references otus_dev.users (email) on update cascade on delete cascade
);
create table otus_dev.users_areasOfInterest (
  email varchar(255) not null,
  areaOfInterest varchar(64) not null,
  primary key (email, areaOfInterest),
  constraint email__fk foreign key (email) references otus_dev.users (email) on update cascade on delete cascade,
  constraint areasOfInterest__fk foreign key (areaOfInterest) references otus_dev.areasOfInterest (areaOfInterest) on update cascade on delete cascade
);
create index areasOfInterest__fk on otus_dev.users_areasOfInterest (areaOfInterest);
insert into
  otus_dev.areasOfInterest (areaOfInterest)
values
  ('Hiking');
insert into
  otus_dev.areasOfInterest (areaOfInterest)
values
  ('Programming');
insert into
  otus_dev.areasOfInterest (areaOfInterest)
values
  ('Reading');
insert into
  otus_dev.areasOfInterest (areaOfInterest)
values
  ('Running');
insert into
  otus_dev.areasOfInterest (areaOfInterest)
values
  ('Travelling');