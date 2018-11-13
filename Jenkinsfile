// Jenkinsfile
pipeline {

  agent {
    docker {
      image 'alang/django'
    }
  }

  stages {
    stage('test') {
      steps {
        sh 'python --version'
        // sh 'python manage.py runserver'
      }
    }
    stage('build') {
      steps {
        script {
          docker.build test_image
        }
      }
    }
  }
}
