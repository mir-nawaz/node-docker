import constants from '../config/constants';

export default (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        unique: true,
      },
      owner: String,
      state: {
        type: String,
        enum: constants.project.state,
        default: constants.project.default,
      },
      participants: [
        mongoose.Schema({
          id: String,
          estimate: Number,
          status: Number,
        }),
      ],
    },
    { timestamps: true }
  );

  schema.method('toJSON', function toJSON() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    // eslint-disable-next-line
    object.participants.map((participant) => { delete participant._id; });
    return object;
  });

  return mongoose.model('project', schema);
};
