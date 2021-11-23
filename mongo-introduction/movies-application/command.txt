/* 

(1) find all movies which are equal to movie_name

db.users.find({"movie_name":{$eq:"In the Loop"}}).pretty()


(2) find all movies which are not equal to movie_name

db.users.find({"movie_name":{$ne:"In the Loop"}}).pretty()


(3) find all movies greater than and greater than equal to a budget

db.users.find({"budget":{$gt:9000}}).pretty()

db.users.find({"budget":{$gte:9000}}).pretty()


(4) find all movies less than and less than equal to a budget

db.users.find({"budget":{$lt:1000}}).pretty()

db.users.find({"budget":{$lte:10000}}).pretty()


(5) find all movies that are produced after 2000 with budget greater than 10000

db.users.find({$and: [{production_year:{$gt:1999}},{budget:{$gt:10000}}]}).pretty()


(6) find all movies that are produced after 2000 or budget greater than 10000

db.users.find({$or: [{production_year:{$gt:1999}},{budget:{$gt:10000}}]}).pretty()


(7) find all movies that are neither produced after 2000 nor with budget greater than 10000.

db.users.find({$nor: [{production_year:{$gt:1999}},{budget:{$gt:10000}}]}).pretty()


(8) find all movies that are not produced in 2000 or they do not have budget of 10000

db.users.find({$nor: [{production_year:{$eq:2000}},{budget:{$eq:10000}}]}).pretty()


(9) find all movies that were produced from 2000 to 2010.

db.users.find({$and: [{production_year:{$gte:2000}},{production_year:{$lte:2010}}]}).pretty()


(10) Sort all movies descending based on the production year and if the year is same then alphabetically for their movie_names

db.users.find().sort({production_year:-1,movie_name:1}).pretty()


(11) in query 10 skip the first 10 entries and fetch the next 5

db.users.find().sort({production_year:-1,movie_name:1}).skip(10).limit(5).pretty()


(12) remove movie genre from the first 10 movies in query 10.



*/