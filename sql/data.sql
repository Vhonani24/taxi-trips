create table region(
	id serial not null primary key,
	name text not null
	
);

create table taxi(
	id serial not null primary key,
	reg_number text not null,
    trip_count int not null,
    region_id int not null,
	foreign key (region_id) references region(id)
	
);
create table routes(
	id serial not null primary key,
	route_name text not null,
    fare decimal (10,2) not null

);

create table trips(
	id serial not null primary key,
	reg_number text not null,
    region_name text not null,
    route_name text not null,
    fare decimal (10,2) not null,
    trip_count int not null

);
insert into trips(reg_number,region_name,route_name,fare,trip_count) values ('CA 123 456','Cape Town','Cape Town - Bellville',23.00,2);
insert into trips(reg_number,region_name,route_name,fare,trip_count) values ('GP 123 000','Gauteng','Sandton - Randburg',50.00,4);
insert into trips(reg_number,region_name,route_name,fare,trip_count) values ('ZN 123 456','Durban','Durban - Kwamashu',60.00,5);
insert into trips(reg_number,region_name,route_name,fare,trip_count) values ('GP 123 000','Gauteng','Sandton - Randburg',50.00,4);
insert into trips(reg_number,region_name,route_name,fare,trip_count) values ('GP 123 000','Gauteng','Alexandra - Sandton',35.00,3);
insert into trips(reg_number,region_name,route_name,fare,trip_count) values ('CA 123 456','Cape Town','Cape Town - Langa',180.00,3);





insert into region(id, name) values (1, 'Durban');
insert into region(id, name) values (2, 'Cape Town');
insert into region(id, name) values (3, 'Gauteng');

insert into routes(route_name,fare) values ('Cape Town - Bellville',23.00);
insert into routes(route_name, fare) values ('Cape Town - Gugulethu',105.55);
insert into routes(route_name, fare) values ('Cape Town - Langa',100.00);


insert into taxi(reg_number,trip_count,region_id) values ('CA 123 456',2,2);
insert into taxi(reg_number, trip_count,region_id) values ('CA 456 789',5,2);
insert into taxi(reg_number, trip_count,region_id) values ('ZN 333 444',3,1);
insert into taxi(reg_number,trip_count,region_id) values ('ZN 111 000',3,1);
insert into taxi(reg_number, trip_count,region_id) values ('GP 666 222',4,3);
insert into taxi(reg_number, trip_count,region_id) values ('GP 222 999',7,3);






