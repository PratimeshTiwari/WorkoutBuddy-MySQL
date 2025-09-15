import {DB_TABLE} from '../constants.js';
import {pool} from '../db/db.js';
const getWorkouts = async (req,res) => {
    try{
        const [rows] = await pool.query(`SELECT * from ${DB_TABLE} WHERE DELETEFLAG=0`);
        res.status(200).json({
            success : true,
            message : "All products fetched",
            data : rows
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Database error",
            error : error.message
        });
    }
}

const addWorkouts = async (req,res) =>{
    try{
        const {workout,reps} = req.body;
        await pool.query(`INSERT INTO ${DB_TABLE}(workout,reps) VALUES(?,?)`,
            [workout,reps]);
        res.status(200).json({
            success : true,
            message : "New Product Added",
            data : {workout,reps}
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Insertion failed",
            error : error.message
        });
    }
}

const deleteWorkout = async(req,res)=>{
    try{
        const {id} = req.params;
        const [row] = await pool.query(`SELECT * FROM ${DB_TABLE} WHERE ID = ? and deleteFlag=0`,[id]);
        if(row.length == 0){
            return res.status(404).json({
                success : false,
                message : "Workout Not found or Already Deleted"
            })
        }
        await pool.query(`UPDATE ${DB_TABLE} set deleteflag = 1 where id = ?`,[id]);
        res.status(200).json({
            success : true,
            message : "Workout deleted",
            data : row
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Error Deleting Workout",
            error : error.message
        });
    }
}

const getSingleWorkout = async(req,res)=>{
    try{
        const {id} = req.params;
        const [row] = await pool.query(`SELECT * FROM ${DB_TABLE} WHERE ID = ? and deleteFlag=0`,[id]);
        if(row.length == 0){
            return res.status(404).json({
                success : false,
                message : "Workout Not found"
            })
        }

        res.status(201).json({
            success : true,
            message : "Fetched single workout",
            data : row
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Workout not found",
            error : error.message
        });
    }
}

const updateWorkouts = async (req,res) =>{
    try{
        const {id} = req.params;
        const [rows] = await pool.query(`SELECT * FROM ${DB_TABLE} WHERE id=? and deleteFlag = 0`,[id]);
        if(rows.length == 0){
            return res.status(404).json({
                success : false,
                message : "Workout Not found"
            })
        }
        const {workout,reps} = req.body;
        await pool.query(`UPDATE ${DB_TABLE} SET workout = ?,reps = ? where id = ?`,[workout,reps,id]);
        res.status(200).json({
            success : true,
            message : "Workout Updated",
            data : {id,workout,reps}
        });
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Updated failed",
            error : error.message
        });
    }
}

export {getWorkouts,getSingleWorkout,addWorkouts,updateWorkouts,deleteWorkout};