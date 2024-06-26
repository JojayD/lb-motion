FROM continuumio/miniconda3 as base

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy the Conda environment file
COPY lb-motion.yml /app/lb-motion.yml

# Create the Conda environment
RUN conda env create -f /app/lb-motion.yml

# Make RUN commands use the new environment
SHELL ["conda", "run", "-n", "lb-motion", "/bin/bash",   "-c"]

# Copy your application code to the container
COPY . /app

# Expose the port your app runs on
EXPOSE 8000

# The command to run your application
CMD ["conda", "run", "--no-capture-output", "-n", "lb-motion", "python", "app.py"]