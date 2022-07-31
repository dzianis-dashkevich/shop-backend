create extension if not exists "uuid-ossp";

create table product (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer not null
);

create table stocks (
	product_id uuid not null,
	foreign key (product_id) references product(id),
	count integer not null
);

insert into product (title, description, price) values ('Anger', 'A strong feeling of annoyance, displeasure, or hostility.', 24);
insert into product (title, description, price) values ('Joy', 'A feeling of great pleasure and happiness.', 10);
insert into product (title, description, price) values ('Love', 'A great interest and pleasure in something.', 23);
insert into product (title, description, price) values ('Hatred', 'Intense dislike or ill will.', 15);
insert into product (title, description, price) values ('Optimism', 'Hopefulness and confidence about the future or the successful outcome of something.', 23);
insert into product (title, description, price) values ('Hope', 'A feeling of expectation and desire for a certain thing to happen.', 15);
insert into product (title, description, price) values ('Despair', 'The complete loss or absence of hope.', 23);
insert into product (title, description, price) values ('Confusion', 'The state of being bewildered or unclear in ones mind about something.', 15);

insert into stocks (product_id, count) values ('7df78bd1-17c2-4ea2-a584-019306c5f507', 15);
insert into stocks (product_id, count) values ('26287f5d-3f13-467a-9a63-bb98a8dbd275', 12);
insert into stocks (product_id, count) values ('1d5e278c-0d35-47af-88f5-475d2c234146', 10);
insert into stocks (product_id, count) values ('eeb1fe7b-04c7-431e-9290-6147fad5cfe0', 11);
insert into stocks (product_id, count) values ('a1eab45b-21d8-43ec-a8e0-85cc75e700f7', 14);
insert into stocks (product_id, count) values ('c9c3f3f3-d96a-452a-befd-207dfad10cff', 13);
insert into stocks (product_id, count) values ('8cdfc990-2d1d-4b61-a0ca-149d7fddeca7', 17);
insert into stocks (product_id, count) values ('8e6fcacf-fe6b-455b-b936-750beb0b029e', 18);
