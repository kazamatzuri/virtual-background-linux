Based on https://elder.dev/posts/open-source-virtual-background/ 

Extended to use a movie clip looped in the background. 

Currently to get it up and running:

```
docker build -t bodypix ./bodypix
docker run   --rm   --name=bodypix --gpus=all --shm-size=1g --ulimit memlock=-1 --ulimit stack=67108864 -p 9000:9000  bodypix
```

possibly adjust your video devices, make sure you have https://github.com/NVIDIA/nvidia-docker installed. 


(usual python setup, 3.8.1, run install requirements and then run fake.py)

```
python fake.py
```