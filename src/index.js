if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const secret  = process.env.secret
mongoose.connect(process.env.mongoAtlasUrl)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err,"error during connected to the db"))


// mongoose.connect('mongodb://127.0.0.1:27017/business')
//     .then(() => console.log('Connected!'))
//     .catch(err => console.log("error during connected to the db"))

const income = require('./income')
const user = require('../user')
const vechial = require('./vechial')
const trip = require('./trips')

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/lorrydata', async (req, res) => {
    try {
        const result = await vechial.find({}).sort({ _id: -1 });
        res.json(result)
    } catch (error) {
        console.error('Error fetching lorrydata:', error);
        res.status(500).json({ message: 'Server Error' });
    }
})



app.get('/userdata', async (req, res) => {
    try {
        const response = await user.find({}).sort({ _id: -1 })
        res.json(response)
    } catch (error) {
        console.error('Error fetching userdata:', error);
        res.status(500).json({ message: 'Server Error' });
    }
})

app.get('/incomedata', async (req, res) => {
    try {
        const resp = await income.find({}).sort({ _id: -1 })
            .populate('Customer')
        res.json(resp)
    } catch (error) {
        console.error('Error fetching income:', error);
        res.status(500).json({ message: 'Server Error' });
    }
})

app.get('/data', async (req, res) => {
    try {
        const trips = await trip.find({}).sort({ _id: -1 })
            .populate('Vechial')
            .populate('Customer');
        res.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.post('/submit', async (req, res) => {
    try {
        const data = new trip(req.body,{runValidater : true})
        const saveduser = await data.save()
        res.status(201).json({ message: 'Form data received', data: saveduser });
    } catch (error) {
        console.error('Error saving income data:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/submitincome', async (req, res) => {
    try {
        const incomedata = new income(req.body,{runValidater : true});
        const savedIncome = await incomedata.save();
        res.status(201).json({ message: 'Form data received', data: savedIncome });
    } catch (error) {
        console.error('Error saving income data:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/submitnewcustomer', async (req, res) => {
    try {
        const newuser = new user(req.body,{runValidater : true});
        const saveduser = await newuser.save();
        res.status(201).json({ message: 'Form data received', data: saveduser });
    } catch (error) {
        console.error('Error saving user data:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/submitnewvechile', async (req, res) => {
    try {
        const newuser = new vechial(req.body,{runValidater : true});
        const savedvechial = await newuser.save();
        res.status(201).json({ message: 'Form data received', data: savedvechial });
    } catch (error) {
        console.error('Error saving user data:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/submitvechile', async (req, res) => {
    try {
        const incomedata = new income(formData,{runValidater : true});
        const savedIncome = await incomedata.save();
        res.status(201).json({ message: 'Form data received', data: savedIncome });
    } catch (error) {
        console.error('Error saving income data:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', error: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/tripdatamodify/:id', async (req, res) => {
    const { id } = req.params
    const { modifiedCount } = await trip.updateOne({ _id: id }, req.body,{runValidater : true})
    if (modifiedCount > 0) {
        res.status(200).json({ message: 'Trip updated successfully' });
    } else {
        res.status(404).json({ message: 'Trip not found' });
    }
})

app.put('/incomemodify/:id', async (req, res) => {
    const { id } = req.params
    const { modifiedCount } = await income.updateOne({ _id: id }, req.body,{runValidater : true})
    if (modifiedCount > 0) {
        res.status(200).json({ message: 'Trip updated successfully' });
    } else {
        res.status(404).json({ message: 'Trip not found' });
    }
})

app.delete('/tripdatadelete/:id', async (req, res) => {
    const { id } = req.params
    const response = await trip.deleteOne({ _id: id })
    if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Trip updated successfully' });
    } else {
        res.status(404).json({ message: 'Trip not found' });
    }
})

app.delete('/vechiledelete/:id', async (req, res) => {
    const { id } = req.params
    const response = await vechial.deleteOne({ _id: id })
    if (response.deletedCount > 0) {
        res.status(200).json({ message: 'user updated successfully' });
    } else {
        res.status(404).json({ message: 'user not found' });
    }
})

app.delete('/userdelete/:id', async (req, res) => {
    const { id } = req.params
    const response = await user.deleteOne({ _id: id })
    console.log('kkkk')
    if (response.deletedCount > 0) {
        res.status(200).json({ message: 'user updated successfully' });
    } else {
        res.status(404).json({ message: 'user not found' });
    }
})

app.delete('/incomedelete/:id', async (req, res) => {
    const { id } = req.params
    const response = await income.deleteOne({ _id: id })
    if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Trip updated successfully' });
    } else {
        res.status(404).json({ message: 'Trip not found' });
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ReactFrontend/', 'index.html'));
});

app.listen(5000, () => {
    console.log('listening to port 5000')
})