const { Thought, User} = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions', select: "-__v"})
            .select( '-__v')
    
        
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({ params }, res) {
       Thought.findOne({ _id: params.id })
       .populate({
        path: 'reactions', select: '-__v'})
        .select( '-__v')
      
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
      createThought({ body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
        .then(({_id})=> 
             User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
        )
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      }, 
      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
},
      createReaction({params, body}, res) {
          Thought.findOneAndUpdate({ _id: params.thoughtId }, {$push: {reactions: body}},{new:true})
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },
      deleteReaction({ params}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtid }, {$pull: {reactions: {_id: params.reactionId}}}, {new:true})
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
        },
    };


    module.exports= thoughtController;
        
        
