import { ScrollView, View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';

export default function GuideScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 gap-4">
      <Text className="mb-6 text-muted-foreground">
        Learn how Manobela works, what each metric means, and how to use the app during your drives.
      </Text>

      <Accordion type="multiple" collapsible>
        <AccordionItem value="about-manobela">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">About Manobela</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <Text className="text-sm text-muted-foreground">
                Manobela is a driver monitoring system that helps you understand and improve your
                driving behavior. It uses advanced computer vision and AI to analyze your face and
                head movements in real-time, providing insights about focus, fatigue, and overall
                driving safety.
              </Text>
              <Text className="text-sm text-muted-foreground">
                The app monitors five key metrics during your drive: eye closure, yawning, head
                pose, gaze direction, and phone usage. All processing happens securely through a
                WebRTC connection, ensuring your privacy while giving you actionable feedback.
              </Text>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="getting-started">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Getting Started</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">1. Grant Camera Permissions</Text>
                <Text className="text-sm text-muted-foreground">
                  When you first open the app, you&apos;ll be asked to grant camera permissions.
                  This is required for Manobela to monitor your face and head movements. The app
                  only accesses your camera during active monitoring sessions.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">2. Position Your Device</Text>
                <Text className="text-sm text-muted-foreground">
                  Mount your phone securely on your dashboard or windshield so the front-facing
                  camera can clearly see your face. The camera should be positioned at eye level or
                  slightly above, with your full face visible in the frame.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">3. Check Connection Status</Text>
                <Text className="text-sm text-muted-foreground">
                  Before starting, check the connection status indicator at the top of the Monitor
                  screen. It should show &quot;Ready&quot; or &quot;Connected&quot; before you begin
                  your drive. If you see an error, check your internet connection and try again.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">4. Test Before Driving</Text>
                <Text className="text-sm text-muted-foreground">
                  Start a test session while parked to ensure everything is working correctly. You
                  should see your face in the camera preview and the metrics should begin updating
                  in real-time.
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="camera-setup">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Camera Setup & Positioning</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">Optimal Camera Position</Text>
                <Text className="text-sm text-muted-foreground">
                  • Mount your device on the dashboard or windshield, centered or slightly to the
                  right (for right-hand drive vehicles)
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Position the camera at eye level or 10-15cm above your eye line
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Ensure your entire face is visible, including forehead, eyes, nose, and mouth
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Avoid extreme angles - the camera should face you directly, not from the side
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Lighting Conditions</Text>
                <Text className="text-sm text-muted-foreground">
                  • Good lighting is essential for accurate detection. Natural daylight works best
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Avoid backlighting (bright light behind you) which can make your face hard to
                  see
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • If driving at night, ensure interior lights provide adequate illumination
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Remove sunglasses or tinted glasses that might obstruct eye detection
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Common Issues</Text>
                <Text className="text-sm text-muted-foreground">
                  • If metrics aren&apos;t updating, check that your face is fully visible and
                  well-lit
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Adjust your seat position if the camera can&apos;t see your face clearly
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Clean your camera lens regularly for best results
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="understanding-interface">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Understanding the Interface</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">Monitor Screen</Text>
                <Text className="text-sm text-muted-foreground">
                  The main screen shows your camera feed at the top, followed by five metric
                  indicators below. Tap any metric icon to see detailed information about that
                  specific metric.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Connection Status</Text>
                <Text className="text-sm text-muted-foreground">
                  At the top, you&apos;ll see your connection status. &quot;Connected&quot; means
                  everything is working. &quot;Connecting&quot; indicates the app is establishing a
                  connection. Any errors will be displayed here.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Record Button</Text>
                <Text className="text-sm text-muted-foreground">
                  The large record button in the center of the camera view starts and stops
                  monitoring. When active, it turns red and shows &quot;Stop&quot;. When idle, it
                  shows &quot;Start&quot; in green.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Metric Indicators</Text>
                <Text className="text-sm text-muted-foreground">
                  Five circular icons represent different metrics: Eyes, Yawn, Head, Gaze, and
                  Phone. When a metric shows a warning (turns red or fills up), tap it to see
                  detailed values. Gray indicators mean the metric is inactive or no data is
                  available yet.
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Metric Details</Text>
                <Text className="text-sm text-muted-foreground">
                  When you tap a metric, detailed information appears below showing specific values
                  like percentages, counts, and alert states. This helps you understand exactly what
                  the system is detecting.
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="about-metrics">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">About Each Metric</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-4">
              <View>
                <Text className="font-semibold">👁️ Eyes (Eye Closure)</Text>
                <Text className="mb-2 text-sm text-muted-foreground">
                  Monitors how often and how long your eyes are closed, which can indicate fatigue
                  or drowsiness.
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • EAR (Eye Aspect Ratio): Measures how open your eyes are. Lower values indicate
                  eyes are closing
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • PERCLOS: Percentage of time your eyes are closed. Higher values suggest fatigue
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Alert triggers when eyes are closed too frequently or for too long
                </Text>
              </View>
              <View>
                <Text className="font-semibold">😴 Yawn</Text>
                <Text className="mb-2 text-sm text-muted-foreground">
                  Detects yawning, which is a strong indicator of fatigue or drowsiness.
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Yawn Count: Total number of yawns detected during the session
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Yawn Rate: Frequency of yawning over time
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Alert triggers when yawning is detected or yawn rate is high
                </Text>
              </View>
              <View>
                <Text className="font-semibold">👤 Head (Head Pose)</Text>
                <Text className="mb-2 text-sm text-muted-foreground">
                  Tracks the orientation of your head to detect if you&apos;re looking away from the
                  road.
                </Text>
                <Text className="Testing">Rawr</Text>
                <Text className="text-xs text-muted-foreground">
                  • Yaw: Left/right head rotation (looking left or right)
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Pitch: Up/down head tilt (looking up or down)
                </Text>
                <Text className="text-xs text-muted-foreground">• Roll: Sideways head tilt</Text>
                <Text className="text-xs text-muted-foreground">
                  • Sustained values track how long your head stays in a non-forward position
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Alerts trigger when head pose deviates significantly from forward-facing
                </Text>
              </View>
              <View>
                <Text className="font-semibold">🎯 Gaze</Text>
                <Text className="mb-2 text-sm text-muted-foreground">
                  Monitors where you&apos;re looking by tracking eye direction, detecting if your
                  gaze is away from the road.
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Gaze Rate: How often your gaze deviates from the forward direction
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Alert triggers when you&apos;re looking away from the road frequently
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Helps detect distractions like looking at passengers or side mirrors for too
                  long
                </Text>
              </View>
              <View>
                <Text className="font-semibold">📱 Phone Usage</Text>
                <Text className="mb-2 text-sm text-muted-foreground">
                  Detects when you&apos;re using your phone while driving, one of the most dangerous
                  distractions.
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Phone Usage: Binary detection of phone use
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Phone Usage Rate: Percentage of time spent using the phone
                </Text>
                <Text className="text-xs text-muted-foreground">
                  • Alert triggers immediately when phone usage is detected
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="steps-usage">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">How to Use During Driving</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">1. Before You Start Driving</Text>
                <Text className="text-sm text-muted-foreground">
                  • Open the Manobela app and navigate to the Monitor tab
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Ensure your device is securely mounted and camera is positioned correctly
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Check that the connection status shows &quot;Ready&quot; or
                  &quot;Connected&quot;
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Verify your face is clearly visible in the camera preview
                </Text>
              </View>
              <View>
                <Text className="font-semibold">2. Start Recording</Text>
                <Text className="text-sm text-muted-foreground">
                  • Tap the green &quot;Start&quot; button to begin monitoring
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Wait a few seconds for the connection to establish and metrics to start updating
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • The button will turn red and show &quot;Stop&quot; when recording is active
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • You can now begin driving normally
                </Text>
              </View>
              <View>
                <Text className="font-semibold">3. During Your Drive</Text>
                <Text className="text-sm text-muted-foreground">
                  • Drive normally - Manobela monitors in the background
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Glance at the metric indicators occasionally, but keep your focus on the road
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • If a metric turns red or fills up, it means an alert condition was detected
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Tap any metric icon to see detailed information (only when safe to do so)
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • If you see multiple alerts, consider taking a break when safe
                </Text>
              </View>
              <View>
                <Text className="font-semibold">4. End Your Session</Text>
                <Text className="text-sm text-muted-foreground">
                  • When you reach your destination or finish driving, tap the red &quot;Stop&quot;
                  button
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Wait for the session to end and connection to close
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • The app will save your session data automatically
                </Text>
              </View>
              <View>
                <Text className="font-semibold">5. Review Your Results</Text>
                <Text className="text-sm text-muted-foreground">
                  • Navigate to the Insights tab to see a summary of your drive
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Review which metrics had alerts and identify patterns
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Use this information to improve your driving habits
                </Text>
              </View>
              <View>
                <Text className="font-semibold">6. Regular Use</Text>
                <Text className="text-sm text-muted-foreground">
                  • Use Manobela regularly to track your progress over time
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Compare sessions to see improvements in your driving behavior
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Build safer, more focused driving habits through consistent monitoring
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="interpreting-results">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Interpreting Your Results</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">Understanding Metric States</Text>
                <Text className="text-sm text-muted-foreground">
                  • Green/Gray: Normal state, no issues detected
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Yellow/Partial Fill: Moderate concern, worth monitoring
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Red/Full Fill: Alert condition detected, immediate attention recommended
                </Text>
              </View>
              <View>
                <Text className="font-semibold">What Good Results Look Like</Text>
                <Text className="text-sm text-muted-foreground">
                  • All metrics stay in green/gray throughout the drive
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Low or zero alert counts for all metrics
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Consistent forward-facing head pose and gaze
                </Text>
                <Text className="text-sm text-muted-foreground">• No phone usage detected</Text>
              </View>
              <View>
                <Text className="font-semibold">When to Take Action</Text>
                <Text className="text-sm text-muted-foreground">
                  • Multiple metrics showing alerts simultaneously suggests fatigue or distraction
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • High PERCLOS (eye closure) or frequent yawning indicates drowsiness
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Sustained head pose alerts mean you&apos;re looking away from the road too often
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Phone usage alerts require immediate attention - pull over if safe
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Improving Over Time</Text>
                <Text className="text-sm text-muted-foreground">
                  • Track your alert frequency across multiple sessions
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Identify times of day when you&apos;re more alert or more fatigued
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Notice patterns in your driving behavior and work to address them
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Celebrate improvements in your metrics over time
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="troubleshooting">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Troubleshooting</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">Connection Issues</Text>
                <Text className="text-sm text-muted-foreground">
                  • If you see &quot;Connection Error&quot;, check your internet connection
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Try closing and reopening the app
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Ensure you&apos;re not on a restricted network (some corporate networks block
                  WebRTC)
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Restart your device if connection issues persist
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Camera Not Working</Text>
                <Text className="text-sm text-muted-foreground">
                  • Check that camera permissions are granted in your device settings
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Ensure no other app is using the camera
                </Text>
                <Text className="text-sm text-muted-foreground">• Clean the camera lens</Text>
                <Text className="text-sm text-muted-foreground">
                  • Restart the app if the camera preview is black
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Metrics Not Updating</Text>
                <Text className="text-sm text-muted-foreground">
                  • Ensure your face is fully visible and well-lit
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Adjust camera position if your face isn&apos;t centered
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Remove sunglasses or tinted glasses
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Check that recording has actually started (button should be red)
                </Text>
              </View>
              <View>
                <Text className="font-semibold">False Alerts</Text>
                <Text className="text-sm text-muted-foreground">
                  • Some false alerts are normal - the system is sensitive by design
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Adjust camera angle if you&apos;re getting frequent false head pose alerts
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Ensure good lighting to reduce false eye closure detections
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Focus on patterns rather than individual alerts
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Battery & Performance</Text>
                <Text className="text-sm text-muted-foreground">
                  • Keep your device plugged in during long drives
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Close other apps to ensure smooth performance
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • The app uses significant battery due to camera and network usage
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="best-practices">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Best Practices</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">Safety First</Text>
                <Text className="text-sm text-muted-foreground">
                  • Never interact with the app while driving - set it up before you start
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • If you need to check metrics, pull over safely first
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Manobela is a tool to help you, not a replacement for safe driving practices
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Always prioritize road safety over checking the app
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Optimal Usage</Text>
                <Text className="text-sm text-muted-foreground">
                  • Use Manobela during longer drives when fatigue is more likely
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Start monitoring at the beginning of your trip, not mid-drive
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Review your results after each drive to learn and improve
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Use consistently to build better driving habits
                </Text>
              </View>
              <View>
                <Text className="font-semibold">When to Take Breaks</Text>
                <Text className="text-sm text-muted-foreground">
                  • If you see multiple fatigue-related alerts (eyes, yawn), take a break
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • High alert frequency suggests you may be too tired to drive safely
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Listen to your body - Manobela confirms what you may already feel
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Regular breaks improve both safety and your driving metrics
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Improving Your Scores</Text>
                <Text className="text-sm text-muted-foreground">
                  • Get adequate sleep before long drives
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Avoid distractions - put your phone away while driving
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Stay hydrated and take regular breaks on long trips
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Practice defensive driving techniques
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Keep your focus on the road ahead
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy-data">
          <AccordionTrigger>
            <Text className="text-lg font-semibold">Privacy & Data</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="gap-3">
              <View>
                <Text className="font-semibold">How Your Data is Used</Text>
                <Text className="text-sm text-muted-foreground">
                  • Video streams are processed in real-time through a secure WebRTC connection
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Only metric data (not video) is stored locally on your device
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Video is not recorded or stored - only analyzed in real-time
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • All processing happens securely through encrypted connections
                </Text>
              </View>
              <View>
                <Text className="font-semibold">What is Stored</Text>
                <Text className="text-sm text-muted-foreground">
                  • Session summaries with metric statistics
                </Text>
                <Text className="text-sm text-muted-foreground">• Alert counts and timestamps</Text>
                <Text className="text-sm text-muted-foreground">
                  • No personal images or video recordings
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Data is stored locally on your device
                </Text>
              </View>
              <View>
                <Text className="font-semibold">Your Privacy</Text>
                <Text className="text-sm text-muted-foreground">
                  • You control when monitoring starts and stops
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Camera access is only used during active sessions
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • You can delete session data at any time
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • No data is shared with third parties
                </Text>
              </View>
            </View>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollView>
  );
}
