pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  environment {
    PATH = "/usr/local/bin:$PATH"
  }

  stages {
    stage('Build'){
      steps{
        dir('react-app') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
    stage('Test'){
      steps{
        dir('react-app') {
          sh 'npm run test -- --coverage'
        }
      }
    }
    stage('Deploy'){
      steps {
        dir('react-app') {
          sh 'sysctl -w fs.inotify.max_user_watches=10000'
          sh 'npm start'
        }
      }
    }
  }
}
