package com.projects.edith.repo;

import com.projects.edith.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MessageRepository extends JpaRepository<Message,Integer> {
    @Query(nativeQuery = true,
            value = "SELECT message,timestamp, senderid FROM message WHERE (senderid = :id1 AND receiverid = :id2) OR (senderid = :id2 AND receiverid = :id1) ORDER BY timestamp ")
    List<Map<String, Object>> findMessagesAndDetailsBetweenUsers(
            @Param("id1") Integer id1,
            @Param("id2") Integer id2
    );
}
