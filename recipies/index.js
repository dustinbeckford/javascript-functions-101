require('dotenv').config()
const express = require("express");
const app = express();
const { Pool } = require("pg");
// Create a PostgreSQL connection pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "restaurant",
  user: "postgres",
  password: process.env.DATABASE_PASSWORD, // Update with your PostgreSQL port number
});
app.use(express.json());
// Your routes will go here...

//THESE ARE THE ORDER ROUTES

//GET ORDERS  
app.get("/get_orders", (req, res) => {
    pool.connect((err, client, release) => {
      if (err) {
        release();
        console.error("Error connecting to the database: ", err);
        res.status(500).send("Internal service error");
        return;
      }
  
      const sqlQuery = `SELECT * FROM orders` 
  
      client.query(sqlQuery, (err, result) => {
        release();
        if (err) {
          console.error("Error in executing the query: ", err);
          res.status(500).send("Internal server error");
          return;
        }
        res.send(result);
      });
    });
})
// POST  Orders

app.post("/update_orders", (req, res) => {
 
  const customerId = req.body.customer_id;
  const recipeId = req.body.recipe_id;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the database: ", err);
      res.status(500).send("Internal service error");
      return;
    }

    const sqlQuery = `INSERT INTO orders (customer_id, recipe_id) VALUES ($1,$2);` 
    const values = [customerId,recipeId]
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
})

// GET
app.get("/get_orders_by/:id", (req, res) => {
  const id = req.params.id   

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the database: ", err);
      res.status(500).send("Internal service error");
      return;
    }

    const sqlQuery = `SELECT * FROM orders where id=$1` 
    const values = [id]

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
})

//PUT BY ID

app.post("/update_orders_by/:id", (req, res) => {
 
  const id = req.params.id   
  const customerId = req.body.customer_id;
  const recipeId = req.body.recipe_id;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the database: ", err);
      res.status(500).send("Internal service error");
      return;
    }

    const sqlQuery = `UPDATE orders SET customer_id = $1, recipe_id = $2 where id=$3`
    const values = [customerId,recipeId, id]

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
})

//DEL 
app.post("/del_order_by/:id", (req, res) => {
 
  const id = req.params.id   
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the database: ", err);
      res.status(500).send("Internal service error");
      return;
    }

    const sqlQuery = `DELETE FROM orders WHERE id=$1`
    const values = [id]

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
})




// Customers ROUTES

//GET ORDERS  
app.get("/get_customers", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the database: ", err);
      res.status(500).send("Internal service error");
      return;
    }

    const sqlQuery = `SELECT * FROM customers` 

    client.query(sqlQuery, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
})
// POST  Orders

app.post("/create_customers", (req, res) => {
const customerName = req.body.customer_name;


pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `INSERT INTO customers (customer_name) VALUES ($1);` 
  const values = [customerName]
  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})

// GET
app.get("/get_customer_by/:id", (req, res) => {
const id = req.params.id   

pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `SELECT * FROM customers where id=$1` 
  const values = [id]

  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})

//PUT BY ID

app.post("/update_customer_by/:id", (req, res) => {
const id = req.params.id   
const customer_name = req.body.customer_name

pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `UPDATE recipes SET customer_name = $1 where id=$2`
  const values = [customer_name, id]

  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})

//DEL 
app.post("/del_customer_by/:id", (req, res) => {

const id = req.params.id   
pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `DELETE FROM customers WHERE id=$1`
  const values = [id]

  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})







// Customer ROUTES

//GET ORDERS  
app.get("/get_recipes", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the database: ", err);
      res.status(500).send("Internal service error");
      return;
    }

    const sqlQuery = `SELECT * FROM recipes` 

    client.query(sqlQuery, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
})
// POST  Orders

app.post("/create_recipe", (req, res) => {
const recipeName = req.body.recipe_name;


pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `INSERT INTO recipes (recipe_name) VALUES ($1);` 
  const values = [recipeName]
  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})

// GET
app.get("/get_recipe_by/:id", (req, res) => {
const id = req.params.id   

pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `SELECT * FROM recipes where id=$1` 
  const values = [id]

  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})

//PUT BY ID

app.post("/update_recipe_by/:id", (req, res) => {
const id = req.params.id   
const recipe_name = req.body.recipe_name

pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `UPDATE recipes SET recipe_name = $1 where id=$2`
  const values = [recipe_name, id]

  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})

//DEL 
app.post("/del_recipe_by/:id", (req, res) => {

const id = req.params.id   
pool.connect((err, client, release) => {
  if (err) {
    release();
    console.error("Error connecting to the database: ", err);
    res.status(500).send("Internal service error");
    return;
  }

  const sqlQuery = `DELETE FROM recipes WHERE id=$1`
  const values = [id]

  client.query(sqlQuery, values, (err, result) => {
    release();
    if (err) {
      console.error("Error in executing the query: ", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});
})



// Start the server
const port = 3002; // Update with your desired port number
app.listen(port, () => console.log(`Server is running on port ${port}`));