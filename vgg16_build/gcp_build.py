import keras.backend as K
from keras.applications import VGG16
from keras.models import Model

from tensorflow.python.saved_model import builder as saved_model_builder
from tensorflow.python.saved_model import utils
from tensorflow.python.saved_model import tag_constants, signature_constants
from tensorflow.python.saved_model.signature_def_utils_impl import build_signature_def, predict_signature_def
from tensorflow.contrib.session_bundle import exporter

# very important to do this as a first thing
K.set_learning_phase(0)

model = VGG16(weights='imagenet', include_top=False, input_shape=(64,64,3))
# model = VGG16(weights='imagenet', include_top=False, input_shape=(100,100,3))

export_path = 'save/'
builder = saved_model_builder.SavedModelBuilder(export_path)

signature = predict_signature_def(inputs={'images': model.input},
                                  outputs={'scores': model.output})

with K.get_session() as sess:
    builder.add_meta_graph_and_variables(
        sess=sess,
        tags=[tag_constants.SERVING],
        signature_def_map={
            signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY: signature
    })
    builder.save()
